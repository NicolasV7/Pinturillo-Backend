-- DROP IF EXISTS TABLE WORD;
-- DROP IF EXISTS TABLE CATEGORY;
-- DROP IF EXISTS TABLE WORD_CATEGORY;
-- DROP IF EXISTS TABLE GAME_ROOM;

CREATE TABLE WORD (
	id serial PRIMARY KEY,
	text VARCHAR(100) NOT NULL
);

CREATE TABLE CATEGORY (
	id serial PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE WORD_CATEGORY (
	id serial PRIMARY KEY,
	id_category int,
	id_word int,
	FOREIGN KEY (id_category) REFERENCES CATEGORY(id),
	FOREIGN KEY (id_word) REFERENCES WORD(id)
);

CREATE TABLE GAME_ROOM (
	id serial PRIMARY KEY,
	room_name VARCHAR(100) NOT NULL,
	state VARCHAR(100) NOT NULL,
	id_category int,
	FOREIGN KEY (id_category) REFERENCES CATEGORY(id)
);