-- DROP TABLE WORD_CATEGORY;
-- DROP TABLE WORD;
-- DROP TABLE GAME_ROOM;
-- DROP TABLE CATEGORY;

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

CREATE TABLE WORD (
	id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
	text VARCHAR(100) NOT NULL
);

CREATE TABLE CATEGORY (
	id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY, 
	name VARCHAR(255) NOT NULL
);

CREATE TABLE GAME_ROOM (
	id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
	room_name VARCHAR(100) NOT NULL,
	state VARCHAR(100) NOT NULL,
	id_category uuid
);

CREATE TABLE WORD_CATEGORY (
	id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
	id_category uuid,
	id_word uuid
);

ALTER TABLE WORD_CATEGORY
	ADD FOREIGN KEY (id_category) REFERENCES CATEGORY(id),
	ADD FOREIGN KEY (id_word) REFERENCES WORD(id);

ALTER TABLE GAME_ROOM
	ADD FOREIGN KEY (id_category) REFERENCES CATEGORY(id);
