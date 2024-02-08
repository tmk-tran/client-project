--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

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
-- Name: calculate_outstanding_balance(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.calculate_outstanding_balance() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
 NEW.outstanding_balance = NEW.book_checked_out_total_value
        - COALESCE(NEW.money_received, 0)
        - COALESCE(NEW.book_quantity_checked_in * 25, 0);
 RETURN NEW;
END;
$$;


--
-- Name: update_checked_out_total_value(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_checked_out_total_value() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
 NEW.book_checked_out_total_value = NEW.book_quantity_checked_out * 25;
 RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: coupon_book; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coupon_book (
    id integer NOT NULL,
    year character varying(20) NOT NULL
);


--
-- Name: coupon_book_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.coupon_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: coupon_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.coupon_book_id_seq OWNED BY public.coupon_book.id;


--
-- Name: fundraiser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fundraiser (
    id integer NOT NULL,
    group_id integer NOT NULL,
    title character varying(100) NOT NULL,
    description character varying NOT NULL,
    photo character varying,
    requested_book_quantity integer NOT NULL,
    book_quantity_checked_out integer NOT NULL,
    book_checked_out_total_value numeric NOT NULL,
    book_quantity_checked_in integer,
    books_sold numeric,
    money_received numeric,
    start_date date NOT NULL,
    end_date date NOT NULL,
    coupon_book_id integer NOT NULL,
    outstanding_balance numeric,
    is_deleted boolean DEFAULT false NOT NULL,
    closed boolean DEFAULT false NOT NULL,
    goal integer
);


--
-- Name: fundraiser_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.fundraiser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fundraiser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.fundraiser_id_seq OWNED BY public.fundraiser.id;


--
-- Name: group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."group" (
    id integer NOT NULL,
    organization_id integer NOT NULL,
    department character varying(100) NOT NULL,
    sub_department character varying(100),
    group_nickname character varying(100),
    group_photo character varying,
    group_description character varying(1000),
    is_deleted boolean DEFAULT false NOT NULL
);


--
-- Name: group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_id_seq OWNED BY public."group".id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization (
    id integer NOT NULL,
    organization_name character varying(200) NOT NULL,
    type character varying(100) NOT NULL,
    address character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    zip integer NOT NULL,
    primary_contact_first_name character varying(50) NOT NULL,
    primary_contact_last_name character varying(50) NOT NULL,
    primary_contact_phone bigint NOT NULL,
    primary_contact_email character varying(100),
    organization_logo character varying,
    is_deleted boolean DEFAULT false NOT NULL,
    organization_earnings numeric DEFAULT 10
);


--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organization_id_seq OWNED BY public.organization.id;


--
-- Name: organization_notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization_notes (
    id integer NOT NULL,
    organization_id integer NOT NULL,
    note_date date NOT NULL,
    note_content character varying(1000) NOT NULL,
    is_deleted boolean DEFAULT false
);


--
-- Name: organization_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.organization_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organization_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organization_notes_id_seq OWNED BY public.organization_notes.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL,
    is_admin boolean DEFAULT false,
    is_deleted boolean DEFAULT false
);


--
-- Name: user-group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user-group" (
    id integer NOT NULL,
    group_id integer NOT NULL,
    user_id integer NOT NULL,
    group_admin boolean DEFAULT false NOT NULL
);


--
-- Name: user-group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user-group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user-group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user-group_id_seq" OWNED BY public."user-group".id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: coupon_book id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coupon_book ALTER COLUMN id SET DEFAULT nextval('public.coupon_book_id_seq'::regclass);


--
-- Name: fundraiser id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fundraiser ALTER COLUMN id SET DEFAULT nextval('public.fundraiser_id_seq'::regclass);


--
-- Name: group id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."group" ALTER COLUMN id SET DEFAULT nextval('public.group_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organization_id_seq'::regclass);


--
-- Name: organization_notes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_notes ALTER COLUMN id SET DEFAULT nextval('public.organization_notes_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user-group id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user-group" ALTER COLUMN id SET DEFAULT nextval('public."user-group_id_seq"'::regclass);


--
-- Data for Name: coupon_book; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.coupon_book (id, year) VALUES (1, '2020-2021');
INSERT INTO public.coupon_book (id, year) VALUES (2, '2021-2022');
INSERT INTO public.coupon_book (id, year) VALUES (3, '2022-2023');
INSERT INTO public.coupon_book (id, year) VALUES (4, '2023-2024');
INSERT INTO public.coupon_book (id, year) VALUES (5, '2024-2025');
INSERT INTO public.coupon_book (id, year) VALUES (6, '2025-2026');


--
-- Data for Name: fundraiser; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (2, 'Moorhead High School', 'School', '555 East Side Drive', 'Moorhead', 'MN', 56560, 'Sally', 'Jenkins', 2183338765, 'mhs@email.com', 'images/mhd-spuds.jpeg', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (3, 'Tech 4 Kids', 'Non Profit', '1234 Computer Street', 'Fargo', 'ND', 58104, 'Jane', 'Doe', 7015551234, '', 'images/tech4kids.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (5, 'Warm Blanket Hugs', 'Nonprofit', '1234 Snuggle Street', 'Fargo', 'ND', 58102, 'Jane', 'Johnson', 7010000000, '', 'images/warm-blanket.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (6, 'Addies Royal Cupcake Stand', 'Small Business', '1234 cupcake road', 'Fargo', 'ND', 58104, 'Addie', 'Cupcake', 8015559292, '', 'images/addies-cupcakes.jpeg', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (12, 'Acapella Express', 'Music', '1234', 'Fargo', 'ND', 58104, 'Jenny', 'Johnson', 7012345678, '', 'images/acapella.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (13, 'City of Fargo', 'city', '1234 Fargo Rd', 'Fargo', 'ND', 58104, 'John', 'Johnson', 7017017011, '', 'images/city-fargo.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (14, 'Cub Scouts', 'sub scouts', '1234 cub scout road', 'Fargo', 'ND', 58104, 'Jarrod', 'Jackson', 7019878989, '', 'images/cub-scouts.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (15, 'Park Christian', 'School', '1234 school street', 'Fargo', 'ND', 58102, 'Park', 'Christian', 7017863452, '', 'images/PCS.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (17, 'Oak Grove', 'School', '1234 Oak road', 'Fargo', 'ND', 58104, 'John', 'Johnson', 7017778909, '', 'images/oak-grove.jpeg', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (21, 'Kiddiland Daycare', 'Daycare', '1234 Kids Street', 'Fargo', 'ND', 58103, 'Johnny', 'Doe', 7015551234, '', 'images/kiddiland.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (7, 'American Legion', 'Non profit', '1234 justice dr', 'Fargo', 'ND', 58102, 'Uncle', 'Sam', 7012005555, '', 'images/vets.png', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (4, 'Homeward Animal Shelter', 'Shelter', '1234 Doggo Way', 'Fargo', 'ND', 58102, 'John', 'Doe', 7015559876, 'john.doe@email.com', 'images/homeward.jpeg', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (1, '4 Luv of Dog Rescue', 'Shelter', '1235 Bark Street S', 'Fargo', 'ND', 58103, 'Jane', 'Doe', 7015552125, 'barks@email.com', 'images/4luv.jpeg', false, 10);
INSERT INTO public.organization (id, organization_name, type, address, city, state, zip, primary_contact_first_name, primary_contact_last_name, primary_contact_phone, primary_contact_email, organization_logo, is_deleted, organization_earnings) VALUES (8, 'Gasper''s School of Dance', 'Dance Studio', '1234 Dance road', 'Fargo', 'ND', 58103, 'Megan', 'Twirl', 7015559191, '', 'images/gaspers.jpeg', false, 10);


--
-- Data for Name: organization_notes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."user" (id, username, password, is_admin, is_deleted) VALUES (3, 'wendyallen', '$2a$10$izd3gLZw1qdTIPbp0pTz0OBDwJ0q3IVrNyZR92R0PctKn1xruHWHG', true, false);
INSERT INTO public."user" (id, username, password, is_admin, is_deleted) VALUES (4, 'chrisallen', '$2a$10$jNcCOFR7GAM3cClovMaz5e5mmkVPPl8udmJu2M6NyWtQWeTP0lj.m', false, false);


--
-- Data for Name: user-group; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: coupon_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coupon_book_id_seq', 1, false);


--
-- Name: fundraiser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.fundraiser_id_seq', 2, true);


--
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.group_id_seq', 1, true);


--
-- Name: organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.organization_id_seq', 22, true);


--
-- Name: organization_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.organization_notes_id_seq', 1, false);


--
-- Name: user-group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user-group_id_seq"', 2, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: coupon_book coupon_book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coupon_book
    ADD CONSTRAINT coupon_book_pkey PRIMARY KEY (id);


--
-- Name: fundraiser fundraiser_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fundraiser
    ADD CONSTRAINT fundraiser_pkey PRIMARY KEY (id);


--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);


--
-- Name: organization_notes organization_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_notes
    ADD CONSTRAINT organization_notes_pkey PRIMARY KEY (id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: user-group user-group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user-group"
    ADD CONSTRAINT "user-group_pkey" PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: fundraiser update_checked_out_total_value_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_checked_out_total_value_trigger BEFORE INSERT OR UPDATE ON public.fundraiser FOR EACH ROW EXECUTE FUNCTION public.update_checked_out_total_value();


--
-- Name: fundraiser update_outstanding_balance; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_outstanding_balance BEFORE INSERT OR UPDATE ON public.fundraiser FOR EACH ROW EXECUTE FUNCTION public.calculate_outstanding_balance();


--
-- Name: fundraiser fundraiser_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fundraiser
    ADD CONSTRAINT fundraiser_group_id_fkey FOREIGN KEY (group_id) REFERENCES public."group"(id);


--
-- Name: group group_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id);


--
-- Name: organization_notes organization_notes_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_notes
    ADD CONSTRAINT organization_notes_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id);


--
-- Name: user-group user-group_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user-group"
    ADD CONSTRAINT "user-group_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

