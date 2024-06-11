--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE ProgramData (
  id                INTEGER PRIMARY KEY,
  programCode       TEXT    NOT NULL  UNIQUE,
  currentSeasonYear INTEGER NOT NULL
);


--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE ProgramData;