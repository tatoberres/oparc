-- Revert oparc:visitor_res_notpassed from pg

BEGIN;

drop view visitor_reservation_not_passed;

COMMIT;
