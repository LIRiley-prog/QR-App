PRAGMA foreign_keys = ON;

-- SCHOOLS
CREATE TABLE IF NOT EXISTS schools (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    short_code  TEXT NOT NULL UNIQUE,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- LOCATIONS (classrooms, bathrooms, etc.)
CREATE TABLE IF NOT EXISTS locations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    school_id   INTEGER NOT NULL,
    name        TEXT NOT NULL,
    code        TEXT NOT NULL,
    type        TEXT NOT NULL DEFAULT 'CLASSROOM', -- CLASSROOM/BATHROOM/LUNCH/OTHER
    is_active   INTEGER NOT NULL DEFAULT 1,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (school_id, code),
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

-- STUDENTS
CREATE TABLE IF NOT EXISTS students (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    school_id    INTEGER NOT NULL,
    school_id_no TEXT NOT NULL,
    full_name    TEXT NOT NULL,
    grade        TEXT,
    qr_value     TEXT UNIQUE,          -- QR contents (optional but usually filled)
    card_uid     TEXT UNIQUE,          -- NFC card UID (optional at first)
    is_active    INTEGER NOT NULL DEFAULT 1,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (school_id, school_id_no),
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

-- SCAN EVENTS (QR or NFC)
CREATE TABLE IF NOT EXISTS scan_events (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id   INTEGER NOT NULL,
    location_id  INTEGER NOT NULL,
    direction    TEXT NOT NULL CHECK (direction IN ('IN','OUT')),
    source       TEXT NOT NULL CHECK (source IN ('QR','NFC')),
    device_label TEXT,
    scanned_at   DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)  REFERENCES students(id)  ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_scan_events_student
    ON scan_events (student_id, scanned_at DESC);

CREATE INDEX IF NOT EXISTS idx_scan_events_location
    ON scan_events (location_id, scanned_at DESC);

CREATE INDEX IF NOT EXISTS idx_scan_events_time
    ON scan_events (scanned_at DESC);
