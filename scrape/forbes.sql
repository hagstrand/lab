

--drop table forbes cascade;
create table forbes (
	seq integer primary key,
	rank integer,
	name varchar,
	industry varchar,
	headquarters varchar,
	country varchar,
	ceo varchar,
	founded integer,
	employees integer,
	revenue integer,
	profits integer,
	assets integer,
	mkt_value integer,
	forbes_webpage varchar
);

COPY forbes
FROM '/home/john/webjohn/lab/scrape/forbes2022.csv'
DELIMITER ','
CSV HEADER;
