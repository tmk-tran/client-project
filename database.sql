
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial primary key NOT NULL,
	"username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"is_admin" BOOLEAN DEFAULT 'false',
	"is_deleted" BOOLEAN DEFAULT 'false'
);



CREATE TABLE "organization" (
	"id" serial primary key NOT NULL,
	"organization_name" varchar(200) NOT NULL,
	"type" varchar(100) NOT NULL,
	"address" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"zip" integer NOT NULL,
	"primary_contact_first_name" varchar(50) NOT NULL,
	"primary_contact_last_name" varchar(50) NOT NULL,
	"primary_contact_phone" integer NOT NULL,
	"primary_contact_email" varchar(100),
	"organization_logo" varchar,
	"is_deleted" BOOLEAN NOT NULL DEFAULT 'false'
);



CREATE TABLE "group" (
    "id" serial primary key NOT NULL,
    "organization_id" integer REFERENCES "organization"("id") NOT NULL,
    "department" varchar(100) NOT NULL,
    "sub_department" varchar(100),
    "group_nickname" varchar(100),
    "group_photo" varchar,
    "group_description" varchar(1000),
    "is_deleted" BOOLEAN NOT NULL DEFAULT 'false'
);


CREATE TABLE "user-group" (
	"id" serial primary key NOT NULL,
	"group_id" integer REFERENCES "group"("id") NOT NULL,
	"user_id" integer REFERENCES "user"("id") NOT NULL,
	"group_admin" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "coupon_book" (
	"id" serial primary key NOT NULL,
	"year" integer NOT NULL
);

CREATE TABLE "fundraiser" (
	"id" serial primary key NOT NULL,
	"group_id" integer REFERENCES "group"("id") NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" integer NOT NULL,
	"photo" varchar,
	"requested_book_quantity" integer NOT NULL,
	"book_quantity_checked_out" integer NOT NULL,
	"book_checked_out_total_value" DECIMAL NOT NULL,
	"book_quantity_checked_in" integer NOT NULL,
	"books_sold" DECIMAL NOT NULL,
	"money_received" DECIMAL NOT NULL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"coupon_book_id" integer REFERENCES "coupon_book"("id") NOT NULL,
	"outstanding_balance" DECIMAL,
	"is_deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"closed" BOOLEAN NOT NULL DEFAULT 'false'
);