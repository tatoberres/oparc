-- Deploy oparc:check to pg

BEGIN;

--check phone number , 10 number  a ameliorer ,je comprends pas pq ca marche pas
ALTER TABLE "visitor"
  ADD CONSTRAINT check_phonenumber CHECK (phonenumber ~ '^\d{10}$');

ALTER TABLE "visitor"
    ADD CONSTRAINT check_email CHECK (email ~ '^([a-zA-Z0-9_\-]+\.)*[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+(com|org|edu|net|ca|au|coop|de|ee|es|fm|fr|gr|ie|in|it|jp|me|nl|nu|ru|uk|us|za)$');


ALTER TABLE "reservation"
    ADD CONSTRAINT check_companions_inf CHECK (companions >= 0),
    ADD CONSTRAINT check_companions_sup CHECK (companions < 4) ;


--code a conserver pour construire liste es horaires
-- select * from generate_series((current_date || ' 08:00:00')::timestamp, 
-- (current_date || ' 18:00:00')::timestamp, '00:10:00') AS val
-- WHERE  val >=  now()


COMMIT;
