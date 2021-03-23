CREATE TABLE project (
    id   INTEGER PRIMARY KEY
                 NOT NULL
                 UNIQUE
                 AUTOINCREMENT,
    uuid TEXT    UNIQUE
                 NOT NULL,
    name TEXT    NOT NULL,
    port INTEGER NOT NULL
);