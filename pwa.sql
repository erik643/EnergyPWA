--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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
-- Name: energys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.energys (
    id integer NOT NULL,
    name text NOT NULL,
    image integer NOT NULL,
    cal integer NOT NULL,
    price numeric(5,2) NOT NULL,
    trating numeric(2,1) NOT NULL,
    arating numeric(2,1) NOT NULL
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
    image text NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: energys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.energys ALTER COLUMN id SET DEFAULT nextval('public.energys_id_seq'::regclass);


--
-- Data for Name: energys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.energys (id, name, image, cal, price, trating, arating) FROM stdin;
1	Red Bull Original	1	500	2.50	4.0	4.5
2	Monster Ultra Sunrise	2	100	3.50	3.5	3.7
3	Rockstar Punched	3	250	2.75	4.1	4.2
4	Amp Energy Original	4	300	2.25	3.9	4.1
5	Full Throttle Original	5	160	2.75	3.5	3.7
6	Reign Total Body Fuel	6	200	3.25	4.2	4.3
7	Xyience Xenergy	7	120	2.50	4.0	4.2
8	Gatorade G2	8	20	1.75	3.5	3.7
9	NOS High Performance Energy	9	340	2.25	4.1	4.3
10	Bang Energy	10	160	3.00	4.0	4.2
11	Rip It Energy Fuel	11	500	3.50	3.9	4.1
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, image) FROM stdin;
3	images/uploads/3/1677503132645.png
8	images/uploads/8/1677503221231.png
1	images/uploads/1/1677503138397.png
10	images/uploads/10/1677504006196.png
11	images/uploads/11/1677504016294.png
1	images/uploads/1/1677503227193.png
2	images/uploads/2/1677503221238.png
9	images/uploads/9/1677503994545.png
4	images/uploads/4/1677503171779.png
2	images/uploads/2/1677503129731.png
7	images/uploads/7/1677503300376.png
5	images/uploads/5/1677503221237.png
5	images/uploads/5/1677503187570.png
4	images/uploads/4/1677503221238.png
4	images/uploads/4/1677503202828.png
8	images/uploads/8/1677503250763.png
3	images/uploads/3/1677503212665.png
6	images/uploads/6/1677503274267.png
1	images/uploads/1/1677509272677.png
1	images/uploads/1/1677509625784.png
1	images/uploads/1/1677510146251.png
3	images/uploads/3/1677511438398.png
\.


--
-- Name: energys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.energys_id_seq', 11, true);


--
-- Name: energys energys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.energys
    ADD CONSTRAINT energys_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

