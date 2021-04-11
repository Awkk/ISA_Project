--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-11 01:29:13

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

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: wmgtfbuwypuxjr
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 4025 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: wmgtfbuwypuxjr
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 14927382)
-- Name: api; Type: TABLE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE TABLE public.api (
    api_id integer NOT NULL,
    method character varying NOT NULL,
    endpoint character varying NOT NULL,
    request integer NOT NULL
);


ALTER TABLE public.api OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 206 (class 1259 OID 14927380)
-- Name: api_api_id_seq; Type: SEQUENCE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE SEQUENCE public.api_api_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_api_id_seq OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 206
-- Name: api_api_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER SEQUENCE public.api_api_id_seq OWNED BY public.api.api_id;


--
-- TOC entry 205 (class 1259 OID 14927332)
-- Name: comment; Type: TABLE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE TABLE public.comment (
    comment_id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    content character varying NOT NULL,
    vote integer DEFAULT 0,
    createdate timestamp without time zone DEFAULT now(),
    modifydate timestamp without time zone DEFAULT now()
);


ALTER TABLE public.comment OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 204 (class 1259 OID 14927330)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE SEQUENCE public.comment_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_comment_id_seq OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 4029 (class 0 OID 0)
-- Dependencies: 204
-- Name: comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER SEQUENCE public.comment_comment_id_seq OWNED BY public.comment.comment_id;


--
-- TOC entry 203 (class 1259 OID 14927313)
-- Name: post; Type: TABLE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE TABLE public.post (
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(50) NOT NULL,
    content character varying NOT NULL,
    vote integer DEFAULT 0,
    createdate timestamp without time zone DEFAULT now(),
    modifydate timestamp without time zone DEFAULT now()
);


ALTER TABLE public.post OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 202 (class 1259 OID 14927311)
-- Name: post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE SEQUENCE public.post_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_post_id_seq OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 4030 (class 0 OID 0)
-- Dependencies: 202
-- Name: post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER SEQUENCE public.post_post_id_seq OWNED BY public.post.post_id;


--
-- TOC entry 201 (class 1259 OID 14927300)
-- Name: users; Type: TABLE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(30) NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 200 (class 1259 OID 14927298)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: wmgtfbuwypuxjr
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO wmgtfbuwypuxjr;

--
-- TOC entry 4031 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3868 (class 2604 OID 14927385)
-- Name: api api_id; Type: DEFAULT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.api ALTER COLUMN api_id SET DEFAULT nextval('public.api_api_id_seq'::regclass);


--
-- TOC entry 3864 (class 2604 OID 14927335)
-- Name: comment comment_id; Type: DEFAULT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.comment ALTER COLUMN comment_id SET DEFAULT nextval('public.comment_comment_id_seq'::regclass);


--
-- TOC entry 3860 (class 2604 OID 14927316)
-- Name: post post_id; Type: DEFAULT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.post ALTER COLUMN post_id SET DEFAULT nextval('public.post_post_id_seq'::regclass);


--
-- TOC entry 3859 (class 2604 OID 14927303)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4019 (class 0 OID 14927382)
-- Dependencies: 207
-- Data for Name: api; Type: TABLE DATA; Schema: public; Owner: wmgtfbuwypuxjr
--

COPY public.api (api_id, method, endpoint, request) FROM stdin;
1	POST	/api/v1/user/register	6
12	GET	/api/v1/comment/4	4
11	GET	/api/v1/post/4	4
8	POST	/api/v1/user/login	4
5	GET	/api/v1/post/1	4
6	GET	/api/v1/comment/1	4
14	DELETE	/api/v1/post/1	1
15	PUT	/api/v1/post/vote/6	1
7	POST	/api/v1/comment	7
17	GET	/api/v1/post/3	2
16	GET	/api/v1/comment/3	2
10	GET	/api/v1/post/2	4
9	GET	/api/v1/comment/2	4
4	POST	/api/v1/post	7
18	GET	/api/v1/post/7	1
19	GET	/api/v1/comment/7	1
20	GET	/api/v1/comment/6	1
21	GET	/api/v1/post/6	1
13	PUT	/api/v1/post/vote/3	1
3	GET	/api/v1/post	32
2	GET	/api/v1/admin	30
\.


--
-- TOC entry 4017 (class 0 OID 14927332)
-- Dependencies: 205
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: wmgtfbuwypuxjr
--

COPY public.comment (comment_id, post_id, user_id, content, vote, createdate, modifydate) FROM stdin;
3	2	2	nice	0	2021-04-11 06:33:50.632026	2021-04-11 06:33:50.632026
4	2	4	Hi Ironman	0	2021-04-11 07:36:27.190201	2021-04-11 07:36:27.190201
5	4	5	I am Batman	0	2021-04-11 07:54:29.35367	2021-04-11 07:54:29.35367
6	4	6	shut your mouth Batman	0	2021-04-11 07:58:06.309696	2021-04-11 07:58:06.309696
7	3	6	I am true spider man	0	2021-04-11 08:00:41.363265	2021-04-11 08:00:41.363265
\.


--
-- TOC entry 4015 (class 0 OID 14927313)
-- Dependencies: 203
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: wmgtfbuwypuxjr
--

COPY public.post (post_id, user_id, title, content, vote, createdate, modifydate) FROM stdin;
2	2	My first post	hahaha	0	2021-04-11 06:33:45.176025	2021-04-11 06:33:45.176025
4	5	Who are you?	I am Spiderman	0	2021-04-11 07:54:06.23118	2021-04-11 07:54:06.23118
3	4	I am Spiderman	nisu	1	2021-04-11 07:36:18.123283	2021-04-11 07:36:18.123283
5	5	What if I told you, I have nothing to tell you	come on Batman and Spiderman	0	2021-04-11 07:56:52.719232	2021-04-11 07:56:52.719232
6	6	I think I am Keanu Reeves	where is my dog?	1	2021-04-11 07:59:57.800086	2021-04-11 07:59:57.800086
7	6	What is your favorite Pokemon?	Do not say Ash	0	2021-04-11 08:03:15.471949	2021-04-11 08:03:15.471949
\.


--
-- TOC entry 4013 (class 0 OID 14927300)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: wmgtfbuwypuxjr
--

COPY public.users (user_id, username, password) FROM stdin;
1	aaa	$2b$10$fnQu14K3WRhxt47MGYuLmO.Gn2t0Bj6Xx9wAAAo9WTeN5PMaBp7qu
2	ironman	$2b$10$g8r073C71czssyVFN58k0eSEatMiHLSR7E/XmKBS47zsiWIjubcbq
3	admin	$2b$10$CByoInnlkdEDcRpG.flVjedZCiWE5skf4WZhA0EeXwNplWZ3p811m
4	spiderman	$2b$10$veEZpWALvaeAz/2XN2O0ZOSKY/ha0JXKUT8h4UF7J.7bUy9SYc6.m
5	Mr. handsome	$2b$10$dNdqISpf4pexpm3Km4Kw.uY8znk50mj4uCizocg59mvOvj5aEvrDS
6	Mr. Ugly	$2b$10$SEe0mbPnxvQjpJ4iPunRU.p6W0HQEsV/bu9BE7OAwrcfzS8dLYPPe
\.


--
-- TOC entry 4032 (class 0 OID 0)
-- Dependencies: 206
-- Name: api_api_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wmgtfbuwypuxjr
--

SELECT pg_catalog.setval('public.api_api_id_seq', 21, true);


--
-- TOC entry 4033 (class 0 OID 0)
-- Dependencies: 204
-- Name: comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wmgtfbuwypuxjr
--

SELECT pg_catalog.setval('public.comment_comment_id_seq', 7, true);


--
-- TOC entry 4034 (class 0 OID 0)
-- Dependencies: 202
-- Name: post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wmgtfbuwypuxjr
--

SELECT pg_catalog.setval('public.post_post_id_seq', 7, true);


--
-- TOC entry 4035 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wmgtfbuwypuxjr
--

SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);


--
-- TOC entry 3878 (class 2606 OID 14927390)
-- Name: api api_pkey; Type: CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.api
    ADD CONSTRAINT api_pkey PRIMARY KEY (api_id);


--
-- TOC entry 3876 (class 2606 OID 14927343)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3874 (class 2606 OID 14927324)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3870 (class 2606 OID 14927308)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3872 (class 2606 OID 14927310)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3880 (class 2606 OID 14927344)
-- Name: comment comment_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(post_id);


--
-- TOC entry 3881 (class 2606 OID 14927349)
-- Name: comment comment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3879 (class 2606 OID 14927325)
-- Name: post post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: wmgtfbuwypuxjr
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 4026 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: wmgtfbuwypuxjr
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO wmgtfbuwypuxjr;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 650
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO wmgtfbuwypuxjr;


-- Completed on 2021-04-11 01:29:21

--
-- PostgreSQL database dump complete
--

