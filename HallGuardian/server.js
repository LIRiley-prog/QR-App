// server.js
// HallGuardian backend – QR/NFC + auth + basic admin APIs (ES module version)

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import sqlite3pkg from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ---- ES module dirname shim ---------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- SQLite setup -------------------------------------------

const sqlite3 = sqlite3pkg.verbose();

// ---- Config --------------------------------------------------

const PORT = process.env.PORT || 4000;
const DB_FILE = process.env.DB_FILE || "hallguardian.db";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-this";
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 10;

// ---- DB setup ------------------------------------------------

const dbPath = path.join(__dirname, DB_FILE);
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to SQLite:", err);
  } else {
    console.log(`✅ Connected to SQLite at ${dbPath}`);
    initializeSchema();
  }
});

function initializeSchema() {
  const schemaPath = path.join(__dirname, "schema.sql");
  if (!fs.existsSync(schemaPath)) {
    console.warn("⚠ schema.sql not found – skipping automatic schema init");
    return;
  }

  const sql = fs.readFileSync(schemaPath, "utf8");
  db.exec(sql, (err) => {
    if (err) {
      console.error("❌ Error applying schema.sql:", err);
    } else {
      console.log("✅ schema.sql applied (or already up to date)");
    }
  });
}

// Promisified helpers
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// ---- Express setup -------------------------------------------

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString(),
  });
});

// ---- Auth middleware -----------------------------------------

function authRequired(roles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Missing or invalid auth token" });
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.user = payload; // { userId, role, schoolId }
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

// ---- Auth routes ---------------------------------------------

// Register – use this to create initial admin/teacher users
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, role, schoolId } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ error: "email, password, and role are required" });
    }

    const existing = await get("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await run(
      `INSERT INTO users (email, password_hash, role, school_id)
       VALUES (?, ?, ?, ?)`,
      [email, hash, role, schoolId || null]
    );

    res.json({ success: true, userId: result.id });
  } catch (err) {
    console.error("register error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login – returns JWT
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email and password are required" });
    }

    const user = await get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        schoolId: user.school_id,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.school_id,
      },
    });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- Admin: Students CRUD ------------------------------------

app.get("/api/students", authRequired(["ADMIN"]), async (req, res) => {
  try {
    const schoolId = req.user.schoolId || req.query.schoolId;
    if (!schoolId) {
      return res.status(400).json({ error: "schoolId is required" });
    }

    const rows = await all(
      "SELECT * FROM students WHERE school_id = ?",
      [schoolId]
    );
    res.json(rows);
  } catch (err) {
    console.error("students list error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/students", authRequired(["ADMIN"]), async (req, res) => {
  try {
    const { schoolId, school_id_no, full_name, grade, qr_value, card_uid } =
      req.body;

    if (!schoolId || !school_id_no || !full_name) {
      return res.status(400).json({
        error: "schoolId, school_id_no and full_name are required",
      });
    }

    const result = await run(
      `INSERT INTO students (school_id, school_id_no, full_name, grade, qr_value, card_uid)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [schoolId, school_id_no, full_name, grade || null, qr_value || null, card_uid || null]
    );

    const student = await get("SELECT * FROM students WHERE id = ?", [
      result.id,
    ]);
    res.json({ success: true, student });
  } catch (err) {
    console.error("students create error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/students/:id", authRequired(["ADMIN"]), async (req, res) => {
  try {
    const id = req.params.id;
    const { full_name, grade, qr_value, card_uid } = req.body;

    await run(
      `UPDATE students
       SET full_name = COALESCE(?, full_name),
           grade = COALESCE(?, grade),
           qr_value = COALESCE(?, qr_value),
           card_uid = COALESCE(?, card_uid)
       WHERE id = ?`,
      [full_name, grade, qr_value, card_uid, id]
    );

    const student = await get("SELECT * FROM students WHERE id = ?", [id]);
    res.json({ success: true, student });
  } catch (err) {
    console.error("students update error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/students/:id", authRequired(["ADMIN"]), async (req, res) => {
  try {
    const id = req.params.id;
    await run("DELETE FROM students WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("students delete error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- Admin: Locations CRUD -----------------------------------

app.get("/api/locations", authRequired(["ADMIN"]), async (req, res) => {
  try {
    const schoolId = req.user.schoolId || req.query.schoolId;
    if (!schoolId) {
      return res.status(400).json({ error: "schoolId is required" });
    }

    const rows = await all(
      "SELECT * FROM locations WHERE school_id = ?",
      [schoolId]
    );
    res.json(rows);
  } catch (err) {
    console.error("locations list error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/locations", authRequired(["ADMIN"]), async (req, res) => {
  try {
    const { schoolId, name, code, type } = req.body;

    if (!schoolId || !name || !code) {
      return res
        .status(400)
        .json({ error: "schoolId, name and code are required" });
    }

    const result = await run(
      `INSERT INTO locations (school_id, name, code, type)
       VALUES (?, ?, ?, ?)`,
      [schoolId, name, code, type || null]
    );

    const location = await get("SELECT * FROM locations WHERE id = ?", [
      result.id,
    ]);
    res.json({ success: true, location });
  } catch (err) {
    console.error("locations create error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- Scan helpers --------------------------------------------

async function findOrCreateLocationByCode(schoolId, locationCode) {
  let loc = await get(
    "SELECT * FROM locations WHERE school_id = ? AND code = ?",
    [schoolId, locationCode]
  );

  if (!loc) {
    const result = await run(
      `INSERT INTO locations (school_id, name, code, type)
       VALUES (?, ?, ?, ?)`,
      [schoolId, locationCode, locationCode, "UNKNOWN"]
    );
    loc = await get("SELECT * FROM locations WHERE id = ?", [result.id]);
  }

  return loc;
}

async function getNextDirection(studentId) {
  const last = await get(
    `SELECT direction FROM scan_events
     WHERE student_id = ?
     ORDER BY scanned_at DESC
     LIMIT 1`,
    [studentId]
  );

  if (!last) return "IN";
  return last.direction === "IN" ? "OUT" : "IN";
}

// ---- Scan: QR ------------------------------------------------

app.post("/api/scan/qr", authRequired(["ADMIN", "TEACHER"]), async (req, res) => {
  try {
    const { qrValue, locationCode, schoolId, deviceLabel } = req.body;

    if (!qrValue || !locationCode || !schoolId) {
      return res.status(400).json({
        error: "qrValue, locationCode, and schoolId are required",
      });
    }

    const student = await get(
      "SELECT * FROM students WHERE qr_value = ? AND school_id = ?",
      [qrValue, schoolId]
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found for that QR" });
    }

    const location = await findOrCreateLocationByCode(schoolId, locationCode);
    const direction = await getNextDirection(student.id);

    const result = await run(
      `INSERT INTO scan_events
       (student_id, location_id, direction, source, device_label, scanned_at)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [student.id, location.id, direction, "QR", deviceLabel || null]
    );

    res.json({
      success: true,
      eventId: result.id,
      student: {
        id: student.id,
        name: student.full_name,
        school_id: student.school_id,
      },
      location: {
        id: location.id,
        name: location.name,
        code: location.code,
      },
      direction,
      source: "QR",
    });
  } catch (err) {
    console.error("scan qr error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- Scan: NFC -----------------------------------------------

app.post("/api/scan/nfc", authRequired(["ADMIN", "TEACHER"]), async (req, res) => {
  try {
    const { cardUid, locationCode, schoolId, deviceLabel } = req.body;

    if (!cardUid || !locationCode || !schoolId) {
      return res.status(400).json({
        error: "cardUid, locationCode, and schoolId are required",
      });
    }

    const student = await get(
      "SELECT * FROM students WHERE card_uid = ? AND school_id = ?",
      [cardUid, schoolId]
    );

    if (!student) {
      return res
        .status(404)
        .json({ error: "Student not found for that card UID" });
    }

    const location = await findOrCreateLocationByCode(schoolId, locationCode);
    const direction = await getNextDirection(student.id);

    const result = await run(
      `INSERT INTO scan_events
       (student_id, location_id, direction, source, device_label, scanned_at)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [student.id, location.id, direction, "NFC", deviceLabel || null]
    );

    res.json({
      success: true,
      eventId: result.id,
      student: {
        id: student.id,
        name: student.full_name,
        school_id: student.school_id,
      },
      location: {
        id: location.id,
        name: location.name,
        code: location.code,
      },
      direction,
      source: "NFC",
    });
  } catch (err) {
    console.error("scan nfc error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- Student current location --------------------------------

app.get(
  "/api/students/:id/current-location",
  authRequired(["ADMIN", "TEACHER"]),
  async (req, res) => {
    try {
      const studentId = req.params.id;

      const event = await get(
        `SELECT se.*, l.name AS location_name, l.code AS location_code
         FROM scan_events se
         JOIN locations l ON l.id = se.location_id
         WHERE se.student_id = ?
         ORDER BY se.scanned_at DESC
         LIMIT 1`,
        [studentId]
      );

      if (!event) {
        return res.json({
          studentId,
          status: "NO_SCANS",
          currentLocation: null,
          lastScanAt: null,
        });
      }

      res.json({
        studentId,
        status: event.direction === "IN" ? "IN_LOCATION" : "OUT_OF_LOCATION",
        currentLocation:
          event.direction === "IN"
            ? {
                id: event.location_id,
                name: event.location_name,
                code: event.location_code,
              }
            : null,
        lastScanAt: event.scanned_at,
      });
    } catch (err) {
      console.error("current-location error", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ---- Location occupants --------------------------------------

app.get(
  "/api/locations/:id/occupants",
  authRequired(["ADMIN", "TEACHER"]),
  async (req, res) => {
    try {
      const locationId = req.params.id;

      const rows = await all(
        `
        WITH last_scans AS (
          SELECT
            se.student_id,
            MAX(se.scanned_at) AS last_time
          FROM scan_events se
          GROUP BY se.student_id
        )
        SELECT
          s.id AS student_id,
          s.full_name,
          se.direction,
          se.scanned_at
        FROM last_scans ls
        JOIN scan_events se
          ON se.student_id = ls.student_id
         AND se.scanned_at = ls.last_time
        JOIN students s ON s.id = se.student_id
        WHERE se.location_id = ?
          AND se.direction = 'IN'
        ORDER BY se.scanned_at DESC
        `,
        [locationId]
      );

      res.json({
        locationId,
        count: rows.length,
        occupants: rows,
      });
    } catch (err) {
      console.error("occupants error", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ---- School: students currently OUT ---------------------------

app.get(
  "/api/schools/:id/current-out",
  authRequired(["ADMIN", "TEACHER"]),
  async (req, res) => {
    try {
      const schoolId = req.params.id;

      const rows = await all(
        `
        WITH last_scans AS (
          SELECT
            se.student_id,
            MAX(se.scanned_at) AS last_time
          FROM scan_events se
          JOIN students s ON s.id = se.student_id
          WHERE s.school_id = ?
          GROUP BY se.student_id
        )
        SELECT
          s.id AS student_id,
          s.full_name,
          l.name AS location_name,
          l.code AS location_code,
          se.direction,
          se.scanned_at
        FROM last_scans ls
        JOIN scan_events se
          ON se.student_id = ls.student_id
         AND se.scanned_at = ls.last_time
        JOIN students s ON s.id = se.student_id
        JOIN locations l ON l.id = se.location_id
        WHERE se.direction = 'OUT'
        ORDER BY se.scanned_at DESC
        `,
        [schoolId]
      );

      res.json({
        schoolId,
        count: rows.length,
        outOfClass: rows,
      });
    } catch (err) {
      console.error("current-out error", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


// ---- Start server --------------------------------------------

app.listen(PORT, () => {
  console.log(`🚀 HallGuardian backend running on http://localhost:${PORT}`);
});
