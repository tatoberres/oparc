-- Verify oparc:init on pg

BEGIN;

SELECT * FROM "visitor" WHERE false;
SELECT * FROM "reservation" WHERE false;
SELECT * FROM "attraction" WHERE false;
SELECT * FROM "incident" WHERE false;

ROLLBACK;
