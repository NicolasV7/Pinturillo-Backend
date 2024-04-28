-- DROP TABLE IF EXISTS WORD;
-- DROP TABLE IF EXISTS CATEGORY;
-- DROP TABLE IF EXISTS WORD_CATEGORY;
-- DROP TABLE IF EXISTS GAME_ROOM;

CREATE TABLE WORD (
	id serial PRIMARY KEY,
	text varchar(35) NOT NULL,
);

CREATE TABLE CATEGORY (
	id serial PRIMARY KEY,
	name varchar(255) NOT NULL,
);

CREATE TABLE WORD_CATEGORY (
	id serial PRIMARY KEY,
	idWord integer NOT NULL,
	idCategory integer NOT NULL,
	FOREIGN KEY (idWord) REFERENCES WORD(id),
	FOREIGN KEY (idCategory) REFERENCES CATEGORY(id),
);

CREATE TABLE GAME_ROOM (
	id serial PRIMARY KEY,
	roomName varchar(100) NOT NULL,
	state varchar(100) NOT NULL,
	idCategory integer NOT NULL,
	FOREIGN KEY (idCategory) REFERENCES CATEGORY(id),
);