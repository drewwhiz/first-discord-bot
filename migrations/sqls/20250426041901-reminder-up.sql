CREATE TABLE Reminders (
  id            INTEGER PRIMARY KEY,
  userId        TEXT    NOT NULL,
  channelId     TEXT    NOT NULL,
  deadline      TEXT    NOT NULL,
  reminder      TEXT    NOT NULL
);