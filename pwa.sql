--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    firstname text NOT NULL,
    username text NOT NULL,
    pwd text NOT NULL,
    pfp text,
    salt text
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: energys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.energys (
    id integer NOT NULL,
    name text NOT NULL,
    image integer NOT NULL,
    cal integer NOT NULL,
    price numeric(5,2) NOT NULL,
    trating integer NOT NULL,
    arating integer NOT NULL
);


ALTER TABLE public.energys OWNER TO postgres;

--
-- Name: energys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.energys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.energys_id_seq OWNER TO postgres;

--
-- Name: energys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.energys_id_seq OWNED BY public.energys.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    image text DEFAULT 'images/icons/placeholder.png'::text NOT NULL,
    userid integer,
    review text,
    title text,
    trating integer,
    arating integer,
    revid integer NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_revid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_revid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_revid_seq OWNER TO postgres;

--
-- Name: images_revid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_revid_seq OWNED BY public.images.revid;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: energys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.energys ALTER COLUMN id SET DEFAULT nextval('public.energys_id_seq'::regclass);


--
-- Name: images revid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN revid SET DEFAULT nextval('public.images_revid_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, firstname, username, pwd, pfp, salt) FROM stdin;
46	Erik	Nishi	$2b$10$lq4LLslhXplrv3kKdg/1VezG1u98H4oIHd0W61M7e4G5Jh4DSxNAm	\N	$2b$10$lq4LLslhXplrv3kKdg/1Ve
48	e	e	$2b$10$WcxatDeQWs5IjKrmYJizMuhyr5TTVfteTqOt8bZTtA6uuI1ALLUfO	\N	$2b$10$WcxatDeQWs5IjKrmYJizMu
49	Erik	Nishii	$2b$10$i3Vnb6xF8Ir1tsVKGoFvYunFuHj/Zipn8kMBtnCZpankcR1eKn5Wa	\N	$2b$10$i3Vnb6xF8Ir1tsVKGoFvYu
50	ee	ee	$2b$10$3Ju9p0TlamlA63nJNrASP.q7P2ZUnMSpkzA5N/96Yk9UovzUGZlru	\N	$2b$10$3Ju9p0TlamlA63nJNrASP.
\.


--
-- Data for Name: energys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.energys (id, name, image, cal, price, trating, arating) FROM stdin;
4	Amp Energy Original	4	300	2.25	4	4
8	Gatorade G2	8	20	1.75	4	4
11	Rip It Energy Fuel	11	500	3.50	4	4
10	Bang Energy	10	160	3.00	3	4
3	Rockstar Punched	3	250	2.75	2	4
6	Reign Total Body Fuel	6	200	3.25	2	4
2	Monster Ultra Sunrise	2	100	3.50	3	4
9	NOS High Performance Energy	9	340	2.25	5	4
7	Xyience Xenergy	7	120	2.50	1	4
5	Full Throttle Original	5	160	2.75	2	4
1	Red Bull Original	1	500	2.50	0	0
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, image, userid, review, title, trating, arating, revid) FROM stdin;
7	images/thumbnail/placeholder.png	48	NIcht so cool	AHHHHHHHHHHHHHHH	4	5	15
4	images/thumbnail/placeholder.png	48	Ur cool	sber nicht ohne gabriel :(	4	5	8
9	images/thumbnail/placeholder.png	50	NIcht so cool	sber nicht ohne gabriel :(	3	5	13
3	images/thumbnail/placeholder.png	48	Ur cool	sber nicht ohne gabriel :(	2	3	7
11	images/thumbnail/placeholder.png	50	Ur cool	sber nicht ohne gabriel :(	2	1	17
1	images/thumbnail/placeholder.png	48	Ur cool	sber nicht ohne gabriel :(	5	4	23
11	images/thumbnail/placeholder.png	50	NIcht so cool	AHHHHHHHHHHHHHHH	3	4	11
6	images/thumbnail/placeholder.png	48	Ur cool	AHHHHHHHHHHHHHHH	2	1	10
10	images/thumbnail/placeholder.png	50	Ur cool	sber nicht ohne gabriel :(	3	2	16
5	images/thumbnail/placeholder.png	48	Ur cool	sber nicht ohne gabriel :(	1	2	9
8	images/thumbnail/placeholder.png	50	NIcht so cool	sber nicht ohne gabriel :(	2	3	14
2	images/thumbnail/placeholder.png	48	NIcht so cool	AHHHHHHHHHHHHHHH	1	4	6
10	images/thumbnail/placeholder.png	50	Ur cool	AHHHHHHHHHHHHHHH	5	3	12
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 50, true);


--
-- Name: energys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.energys_id_seq', 11, true);


--
-- Name: images_revid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_revid_seq', 30, true);


--
-- Name: accounts accounts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pk PRIMARY KEY (id);


--
-- Name: energys energys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.energys
    ADD CONSTRAINT energys_pkey PRIMARY KEY (id);


--
-- Name: accounts_username_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX accounts_username_uindex ON public.accounts USING btree (username);


--
-- PostgreSQL database dump complete
--

