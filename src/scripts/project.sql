CREATE TABLE IF NOT EXISTS project (
    id              INTEGER PRIMARY KEY NOT NULL,
    uuid            TEXT NOT NULL,
    name            TEXT NOT NULL,
    port            INTEGER NOT NULL,
);