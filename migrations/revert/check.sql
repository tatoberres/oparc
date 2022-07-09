-- Revert oparc:check from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "visitor"
  DROP CONSTRAINT check_phonenumber;

ALTER TABLE "visitor"
  DROP CONSTRAINT check_email;

ALTER TABLE "reservation"
  DROP CONSTRAINT check_companions_inf,
  DROP CONSTRAINT check_companions_sup;

COMMIT;
