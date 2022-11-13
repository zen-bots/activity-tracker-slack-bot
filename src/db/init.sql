DROP TABLE IF EXISTS public.activity; CREATE TABLE public.activity (     id SERIAL NOT NULL,     name character varying(50) NOT NULL,     multiplication_factor numeric(6,2) NOT NULL,     CONSTRAINT activity_pkey PRIMARY KEY (id),     CONSTRAINT activity_name_key UNIQUE (name) );
DROP TABLE IF EXISTS public.users; CREATE TABLE public.users (     id serial NOT NULL,     slack_id character varying(15) NOT NULL,     name character varying(50)  NOT NULL,     CONSTRAINT users_pkey PRIMARY KEY (id),     CONSTRAINT users_name_key UNIQUE (name),     CONSTRAINT users_slack_id_key UNIQUE (slack_id) );
DROP TABLE IF EXISTS public.user_activity; CREATE TABLE public.user_activity (     id serial NOT NULL,     user_id integer NOT NULL,     activity_id integer NOT NULL,     point numeric(6,2) NOT NULL,     created_on timestamp without time zone NOT NULL,     CONSTRAINT user_activity_pkey PRIMARY KEY (id),     CONSTRAINT user_activity_user_id_fkey FOREIGN KEY (user_id)         REFERENCES public.users (id) MATCH SIMPLE         ON UPDATE NO ACTION         ON DELETE NO ACTION );
--DROP TABLE IF EXISTS public.waitlist; CREATE TABLE public.waitlist (     id serial NOT NULL,     email_from character varying(100) NOT NULL,     email_to character varying(100) NOT NULL,     name character varying(50) NOT NULL,     message character varying(50) NOT NULL,     created_on timestamp without time zone NOT NULL );


-- Table: public.activity
DROP TABLE IF EXISTS public.activity;
CREATE TABLE public.activity
(
    id SERIAL NOT NULL,
    name character varying(50)  NOT NULL,
    multiplication_factor numeric(6,2) NOT NULL,
    CONSTRAINT activity_pkey PRIMARY KEY (id),
    CONSTRAINT activity_name_key UNIQUE (name)
)
-- INSERT INTO public.activity(name,multiplication_factor) VALUES('/running',1.25);




-- Table: public.users
DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users
(
    id serial NOT NULL,
    slack_id character varying(15)  NOT NULL,
    name character varying(50)  NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_name_key UNIQUE (name),
    CONSTRAINT users_slack_id_key UNIQUE (slack_id)
)
-- INSERT INTO public.activity(slack_id,name) VALUES('none','ozi');





-- Table: public.user_activity
DROP TABLE IF EXISTS public.user_activity;
CREATE TABLE public.user_activity
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    activity_id integer NOT NULL,
    point numeric(6,2) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    CONSTRAINT user_activity_pkey PRIMARY KEY (id),
    CONSTRAINT user_activity_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)