CREATE TABLE BrandColors (
  id      INTEGER PRIMARY KEY,
  brand   TEXT    NOT NULL,
  hexcode TEXT    NOT NULL
);

INSERT INTO BrandColors
  (brand, hexcode)
VALUES
  ('FIRST', '#0066B3'),
  ('FIRST', '#ED1C24'),
  ('FIRST', '#9A989A'),
  ('FIRST', '#231F20'),
  ('FLL',   '#ED1C24'),
  ('FLL',   '#231F20'),
  ('FLL',   '#662D91'),
  ('FLL',   '#00A651'),
  ('FTC',   '#F57E25'),
  ('FTC',   '#231F20'),
  ('FRC',   '#009CD7'),
  ('FRC',   '#231F20'),
  ('10101', '#010101'),
  ('10101', '#ffffff'),
  ('10101', '#00c1c1'),
  ('10101', '#f10101'),
  ('10101', '#fbca13')
;