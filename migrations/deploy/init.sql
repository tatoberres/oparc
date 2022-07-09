-- Deploy oparc:init to pg

BEGIN;

CREATE TABLE "visitor" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstame" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phonenumber" TEXT NOT NULL UNIQUE,
  "begin_date_validity" TIMESTAMPtz DEFAULT now(),
  "end_date_validity" TIMESTAMPtz DEFAULT now()+'1 year'::interval
);

CREATE TABLE "attraction" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "capacity" INT NOT NULL ,
  "open_time" TIME NOT NULL,
  "close_time" TIME NOT NULL,
  "duration" TIME NOT NULL
);

CREATE TABLE "reservation" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "companions" INTEGER DEFAULT 0,
  "reservation_time" TIMESTAMPtz NOT NULL,
  "visitor_id" INT NOT NULL REFERENCES "visitor"("id"),
  "attraction_id" INT NOT NULL REFERENCES "attraction"("id")
);


CREATE TABLE "incident" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" TEXT NOT NULL,
  "operator_name" TEXT NOT NULL,
  "end_time_resolution" TIMESTAMPtz,
  "attraction_id" INT NOT NULL REFERENCES "attraction"("id")
);




COMMIT;
