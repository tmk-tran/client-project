
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
	"primary_contact_phone" bigint NOT NULL,
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
	"description" varchar NOT NULL,
	"photo" varchar,
	"requested_book_quantity" integer NOT NULL,
	"book_quantity_checked_out" integer NOT NULL,
	"book_checked_out_total_value" DECIMAL NOT NULL,
	"book_quantity_checked_in" integer,
	"books_sold" DECIMAL,
	"money_received" DECIMAL,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"coupon_book_id" integer REFERENCES "coupon_book"("id") NOT NULL,
	"outstanding_balance" DECIMAL,
	"is_deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"closed" BOOLEAN NOT NULL DEFAULT 'false'
);

----------------------------------------------------------------------------------------------

-- Create a trigger function to calculate the checked_out_total_value
CREATE OR REPLACE FUNCTION update_checked_out_total_value()
RETURNS TRIGGER AS $$
BEGIN
  NEW.book_checked_out_total_value = NEW.book_quantity_checked_out * 25;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on your_table
CREATE TRIGGER update_checked_out_total_value_trigger
BEFORE INSERT OR UPDATE ON fundraiser
FOR EACH ROW EXECUTE FUNCTION update_checked_out_total_value();

----------------------------------------------------------------------------------------------

-- Create a function to calculate the outstanding_balance
CREATE OR REPLACE FUNCTION calculate_outstanding_balance()
RETURNS TRIGGER AS $$
BEGIN
    NEW.outstanding_balance = NEW.book_checked_out_total_value 
                             - COALESCE(NEW.money_received, 0) 
                             - COALESCE(NEW.book_quantity_checked_in * 25, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create a trigger to update outstanding_balance before insert or update
CREATE TRIGGER update_outstanding_balance
BEFORE INSERT OR UPDATE ON fundraiser
FOR EACH ROW
EXECUTE FUNCTION calculate_outstanding_balance();

----------------------------------------------------------------------------------------------

-- get an array of groups tied to a specific user id that is the admin of the group
SELECT
    g.id AS group_id,
    g.organization_id,
    g.department,
    g.sub_department,
    g.group_nickname,
    g.group_photo,
    g.group_description,
          json_agg(json_build_object('id', f.id, 'title', f.title, 'start_date', f.start_date, 'end_date', f.end_date )) AS fundraisers_info
FROM
    "group" g
LEFT JOIN
    "fundraiser" f ON g.id = f.group_id
JOIN
    "user-group" ug ON g.id = ug.group_id
WHERE
    ug.user_id = 2 AND ug.group_admin = true
GROUP BY
    g.id, g.organization_id, g.department, g.sub_department, g.group_nickname, g.group_photo, g.group_description;