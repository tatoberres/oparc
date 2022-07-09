-- Deploy oparc:visitor_res_notpassed to pg

--return a list of visitor id with associated not passed reservation

BEGIN;

create VIEW visitor_reservation_not_passed AS
select reservation.visitor_id ,array_agg(to_json(reservation)) from reservation
where reservation.id = ANY (select reservation.id from reservation
	where reservation_time::time > current_time)
GROUP BY reservation.visitor_id;

COMMIT;
