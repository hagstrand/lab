/*
Kirsey Basic Temperaments
Personal Priorities
PF16

Gifts
Nourishing Things
Burnouts
*/

create table factor (
	id serial,
	test varchar(10),
	znum integer,
	code varchar(20),
	display varchar(50)
);

create table narrative (
	id serial,
	code varchar(50),
	display varchar(1000)
);

create table rule (
	id serial,
	factorcode varchar(10),
	minbar varchar(20),
	narrativecode varchar(50)
);

create table bar (
	id serial,
	userid integer,
	factorcode integer,
	bar integer
);


list gifts per user
list burnouts per user

rulecode, narrativecode are so similar as to be confusing


