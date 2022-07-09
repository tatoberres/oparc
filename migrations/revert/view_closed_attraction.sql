-- Revert oparc:view_closed_attraction from pg

BEGIN;

-- XXX Add DDLs here.
DROP view closed_attraction;

COMMIT;
