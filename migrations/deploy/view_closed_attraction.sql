-- Deploy oparc:view_closed_attraction to pg

BEGIN;

CREATE VIEW closed_attraction AS
SELECT DISTINCT incident.attraction_id  FROM incident 
	WHERE incident.end_time_resolution IS NULL;

COMMIT;
