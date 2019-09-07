/*create schema movie;*/

drop table movie.title;
drop table movie.director;
drop table movie.writer;
drop table movie.actor;
drop table movie.keyword;
drop table movie.titledirector;
drop table movie.titlewriter;
drop table movie.titleactor;
drop table movie.titlekeyword;

/* static content tables */
create table movie.title (
	id serial,
	name varchar(100),
	language varchar(20),
	year integer,
	ort integer,
	fmt char(3),
	plot text,
	imdbkey varchar(30),
	comment text,
	filename varchar(100),
	rating integer,
	version varchar(10)
);
create index ndx_title_name on movie.title(name);
COMMENT ON COLUMN movie.title.fmt IS 'avi, mkv, mp4';
COMMENT ON COLUMN movie.title.rating IS 'Integer 0 thru 5';
 
create table movie.director (
	id serial,
	name varchar(50)
);

create table movie.writer (
	id serial,
	name varchar(50)
);

create table movie.actor (
	id serial,
	name varchar(50)
);

create table movie.keyword (
	id serial,
	name varchar(50)
);

create table movie.titledirector (
	id serial,
	titleid integer,
	directorid integer
);

create table movie.titlewriter (
	id serial,
	titleid integer,
	writerid integer
);

create table movie.titleactor (
	id serial,
	titleid integer,
	actorid integer
);

create table movie.titlekeyword (
	id serial,
	titleid integer,
	keywordid integer
);

