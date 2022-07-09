-- Revert oparc:init from pg

BEGIN;

DROP TABLE incident;
DROP TABLE reservation;
DROP TABLE attraction;
DROP TABLE visitor;

COMMIT;
