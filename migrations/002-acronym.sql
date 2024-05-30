--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Acronyms (
  id              INTEGER   PRIMARY KEY,
  acronym         TEXT      NOT NULL,
  caseSensitive   BOOLEAN   NOT NULL CHECK (caseSensitive IN (0, 1)),
  explanation     TEXT      NOT NULL
);

CREATE UNIQUE INDEX acronym ON Acronyms(acronym);

INSERT INTO Acronyms
  (acronym, caseSensitive, explanation)
VALUES
  ('TSIMFD', 0, 'https://www.youtube.com/watch?v=b-CvLWbfZhU'),
  ('FIRST', 1, 'For Inspiration and Recognition of Science and Technology'),
  ('FRC', 0, '*FIRST* Robotics Competition'),
  ('FTC', 0, '*FIRST* Tech Challenge'),
  ('FLL', 0, '*FIRST* LEGO League'),
  ('FYSA', 0, 'for your situational awareness'),
  ('WPI', 0, 'Worcester Polytechnic Institute'),
  ('CTRE', 0, 'Cross the Road Electronics'),
  ('CTR', 0, 'Cross the Road Electronics')
;

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Acronyms;