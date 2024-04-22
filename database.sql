-- Drop table

-- DROP TABLE public.word;
-- DROP TABLE public.category;
-- DROP TABLE public.categoryWord;
-- DROP TABLE public.game_room;

CREATE TABLE public.word (
	idWord uuid NOT NULL,
	word text NOT NULL,
	CONSTRAINT word_pkey PRIMARY KEY (idWord)
);

CREATE TABLE public.category (
	idCategory uuid NOT NULL,
	name varchar(255) NOT NULL,
	CONSTRAINT category_pkey PRIMARY KEY (idCategory)
);

CREATE TABLE public.categoryWord (
	idCategoryWord uuid NOT NULL,
	idCategory uuid NOT NULL,
	idWord uuid NOT NULL,
	CONSTRAINT category_word_pkey PRIMARY KEY (idCategoryWord)
);

CREATE TABLE public.game_room (
	idGameRoom uuid NOT NULL,
	roomName varchar(255) NOT NULL,
	idCategory uuid NOT NULL,
	state varchar(255) NOT NULL,
	CONSTRAINT game_room_pkey PRIMARY KEY (idGameRoom)
);