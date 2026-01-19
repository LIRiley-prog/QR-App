// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db, run, get, all } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/**
 * Utility: automatically decide IN vs OUT based on last scan
 * per student + location. If no prior scan or last was OUT → IN.
 * If last was IN → OUT.
 */
async function decideDirection(studentId, locationId, explicitDirection) {
  if (explicitDirection === "IN" || explicitDirection === "OUT") {
    return explicitDirection;
  }

  const last = await get(
    `
    SELECT direction
    FROM scan_events
    WHERE student_id = ? AND location_id = ?
    ORDER BY scanned_at DESC
    LIMIT 1
  `,
    [studentId, locationId]
  );

  if (!last || last.direction === "OUT") return "IN";
  return "OUT";
}

/**
 * Helper: find location by code within a school.
 * For now this assumes location codes are globally unique
 * or you give us the school_id in the request.
 */
async function findLocation({ locationCode, schoolId }) {
  if (!locationCode) return null;

  if (schoolId) {
    return await get(
      "SELECT * FROM locations WHERE school_id = ? AND code = ? AND is_active = 1",
      [schoolId, locationCode]
    );
  }

  // fallback: ignore school if not provided
  return await get(
    "SELECT * FROM locations WHERE code = ? AND is_active = 1",
    [locationCode]
  );
}

/* ============================
   QR SCAN ENDPOINT
   ============================ */
app.post("/api/scan/qr", async (req, res) => {
  try {
    const {
      qrValue,        // string encoded in QR (students.qr_value)
      locationCode,   // e.g. "ROOM-101" (or send locationId instead)
      locationId,
      schoolId,       // optional but good to include
      direction,      // optional: "IN" or "OUT" – will auto-decide if missing
      deviceLabel     // optional: "Room 101 iPad"
    } = req.body;

    if (!qrValue || (!locationCode && !locationId)) {
      return res.status(400).json({ error: "qrValue and location required" });
    }

    // find student by QR
    const student = await get(
      "SELECT * FROM students WHERE qr_value = ?",
      [qrValue]
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found for given QR value" });
    }

    // find location
    let location = null;
    if (locationId) {
      location = await get(
        "SELECT * FROM locations WHERE id = ? AND is_active = 1",
        [locationId]
      );
    } else {
      location = await findLocation({ locationCode, schoolId: schoolId || student.school_id });
    }

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const finalDirection = await decideDirection(student.id, location.id, direction);

    const result = await run(
      `
      INSERT INTO scan_events (student_id, location_id, direction, source, device_label)
      VALUES (?, ?, ?, 'QR', ?)
    `,
      [student.id, location.id, finalDirection, deviceLabel || null]
    );

    return res.json({
      success: true,
      eventId: result.id,
      student: {
        id: student.id,
        name: student.full_name,
        school_id: student.school_id
      },
      location: {
        id: location.id,
        name: location.name,
        code: location.code
      },
      direction: finalDirection,
      source: "QR"
    });
  } catch (err) {
    console.error("Error in /api/scan/qr", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ============================
   NFC SCAN ENDPOINT
   ============================ */
app.post("/api/scan/nfc", async (req, res) => {
  try {
    const {
      cardUid,        // NFC card UID string
      locationCode,
      locationId,
      schoolId,       // optional
      direction,      // optional
      deviceLabel
    } = req.body;

    if (!cardUid || (!locationCode && !locationId)) {
      return res.status(400).json({ error: "cardUid and location required" });
    }

    // find student by NFC card UID
    const student = await get(
      "SELECT * FROM students WHERE card_uid = ?",
      [cardUid]
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found for given card UID" });
    }

    // find location
    let location = null;
    if (locationId) {
      location = await get(
        "SELECT * FROM locations WHERE id = ? AND is_active = 1",
        [locationId]
      );
    } else {
      location = await findLocation({ locationCode, schoolId: schoolId || student.school_id });
    }

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const finalDirection = await decideDirection(student.id, location.id, direction);

    const result = await run(
      `
      INSERT INTO scan_events (student_id, location_id, direction, source, device_label)
      VALUES (?, ?, ?, 'NFC', ?)
    `,
      [student.id, location.id, finalDirection, deviceLabel || null]
    );

    return res.json({
      success: true,
      eventId: result.id,
      student: {
        id: student.id,
        name: student.full_name,
        school_id: student.school_id
      },
      location: {
        id: location.id,
        name: location.name,
        code: location.code
      },
      direction: finalDirection,
      source: "NFC"
    });
  } catch (err) {
    console.error("Error in /api/scan/nfc", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ============================
   ASSIGN NFC CARD TO STUDENT
   ============================ */
app.post("/api/students/:id/assign-card", async (req, res) => {
  try {
    const studentId = req.params.id;
    const { cardUid } = req.body;

    if (!cardUid) {
      return res.status(400).json({ error: "cardUid is required" });
    }

    // ensure cardUid not already used
    const existing = await get(
      "SELECT id, full_name FROM students WHERE card_uid = ? AND id != ?",
      [cardUid, studentId]
    );
    if (existing) {
      return res.status(400).json({
        error: "cardUid already assigned to another student",
        assignedTo: existing
      });
    }

    await run(
      "UPDATE students SET card_uid = ? WHERE id = ?",
      [cardUid, studentId]
    );

    const updated = await get("SELECT * FROM students WHERE id = ?", [studentId]);

    res.json({
      success: true,
      student: {
        id: updated.id,
        name: updated.full_name,
        card_uid: updated.card_uid
      }
    });
  } catch (err) {
    console.error("Error in assign-card", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ============================
   CURRENT LOCATION OF STUDENT
   ============================ */
app.get("/api/students/:id/current-location", async (req, res) => {
  try {
    const studentId = req.params.id;

    // last scan
    const last = await get(
      `
      SELECT se.*, l.name AS location_name, l.code AS location_code
      FROM scan_events se
      JOIN locations l ON l.id = se.location_id
      WHERE se.student_id = ?
      ORDER BY se.scanned_at DESC
      LIMIT 1
    `,
      [studentId]
    );

    if (!last) {
      return res.json({
        studentId,
        status: "UNKNOWN",
        message: "No scans found for this student yet."
      });
    }

    if (last.direction === "OUT") {
      return res.json({
        studentId,
        status: "OUT_OF_LOCATION",
        lastLocation: {
          id: last.location_id,
          name: last.location_name,
          code: last.location_code
        },
        lastScanAt: last.scanned_at
      });
    }

    res.json({
      studentId,
      status: "IN_LOCATION",
      currentLocation: {
        id: last.location_id,
        name: last.location_name,
        code: last.location_code
      },
      lastScanAt: last.scanned_at
    });
  } catch (err) {
    console.error("Error in current-location", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ============================
   WHO IS IN THIS LOCATION NOW?
   ============================ */
app.get("/api/locations/:id/occupants", async (req, res) => {
  try {
    const locationId = req.params.id;

    // last scan per student @ this location, and only keep those with last direction = IN
    const rows = await all(
      `
      SELECT
        s.id AS student_id,
        s.full_name,
        s.school_id,
        last_scans.direction,
        last_scans.scanned_at
      FROM (
        SELECT
          student_id,
          MAX(scanned_at) AS last_time
        FROM scan_events
        WHERE location_id = ?
        GROUP BY student_id
      ) AS recent
      JOIN scan_events last_scans
        ON last_scans.student_id = recent.student_id
       AND last_scans.scanned_at = recent.last_time
      JOIN students s
        ON s.id = recent.student_id
      WHERE last_scans.direction = 'IN'
      ORDER BY last_scans.scanned_at DESC
    `,
      [locationId]
    );

    res.json({
      locationId,
      count: rows.length,
      occupants: rows
    });
  } catch (err) {
    console.error("Error in occupants", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ============================
   SIMPLE HEALTHCHECK
   ============================ */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`HallSync backend running on http://localhost:${PORT}`);
});
