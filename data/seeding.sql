
BEGIN;

INSERT INTO visitor (firstame, lastname,email,phonenumber)
VALUES
    ('patrick', 'letourneux' , 'patrick.letourneux20@gmail.com','1601001101'),
    ('bertha', 'torres' ,'bertha@gmail.com','1601010104'),
    ('valentin', 'vincent' , 'valentin@gmail.com','1601010201'),
    ('yann', 'depardieu' , 'yan@hotmail.fr','1005010101');


INSERT INTO attraction (name, capacity,open_time,close_time,duration)
VALUES
    ('tunnel', 50 , '08:00:00','18:00:00','00:15:00'),
    ('looping', 30 , '09:00:00','19:00:00','00:10:00'),
    ('train', 80 , '08:30:00','12:00:00','00:30:00'),
    ('spectacle', 300 , '13:00:00','22:00:00','02:00:00'),
    ('rodeo', 300 , '13:00:00','23:30:00','00:10:00');


INSERT INTO reservation (companions,
 reservation_time,visitor_id,attraction_id)
VALUES
    (1, (current_date || ' ' ||'00:10:00')::timestamp , 1,1),
    (2, (current_date || ' ' ||'00:10:30')::timestamp , 2,1),
    (3, (current_date || ' ' ||'09:00:00')::timestamp , 3,2),
    (1, (current_date || ' ' ||'12:15:00')::timestamp , 3,2),
    (2, (current_date || ' ' ||'13:15:00')::timestamp , 3,1),
    (2, (current_date || ' ' ||'13:15:00')::timestamp , 2,4),
    (1, (current_date || ' ' ||'23:15:00')::timestamp , 1,2),
    (2, (current_date || ' ' ||'23:15:00')::timestamp , 4,1),
    (2, (current_date || ' ' ||'23:15:00')::timestamp , 4,4);
INSERT INTO incident (description,
 operator_name,end_time_resolution,attraction_id)
VALUES
    ('panne electrique', 'marcel' , now(), 1),
    ('maintenance', 'sophie' , NULL, 2),
    ('verification mecanisme', 'marcel' , '2022-03-07 21:31:57.338756+01'::timestamp, 1),
    ('verification mecanisme', 'marcel' , '2022-03-07 21:31:57.338756+01'::timestamp, 5),
    ('verification mecanisme', 'marcel' , NULL, 5),
    ('tests', 'sophie' , null, 1);




COMMIT;