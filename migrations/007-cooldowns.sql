--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Cooldowns (
  id            INTEGER PRIMARY KEY,
  commandName   TEXT    NOT NULL,
  channelId     TEXT    NOT NULL,
  deadline      TEXT    NOT NULL
);

CREATE UNIQUE INDEX channelCooldown ON Cooldowns(commandName, channelId);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Cooldowns;