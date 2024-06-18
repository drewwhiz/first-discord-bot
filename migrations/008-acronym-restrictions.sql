--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

ALTER TABLE Acronyms 
ADD COLUMN isChannelRestricted BOOLEAN NOT NULL DEFAULT 0 CHECK (isChannelRestricted IN (0, 1));

UPDATE Acronyms
SET isChannelRestricted = 1
WHERE acronym = 'TSIMFD';

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

ALTER TABLE Acronyms DROP COLUMN isChannelRestricted;