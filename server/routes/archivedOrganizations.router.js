const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n      organization (ordering: "group_collection.organization_id" filter: "is_deleted = true"){\r\n
        id\r\n
        organization_name\r\n
        type\r\n
        address\r\n
        city\r\n
        state\r\n
        zip\r\n
        primary_contact_first_name\r\n
        primary_contact_last_name\r\n
        primary_contact_phone\r\n
        primary_contact_email\r\n
        organization_logo\r\n
        is_deleted\r\n
        organization_earnings\r\n
        organization_notes_collection {\r\n
          organization_id\r\n
          note_date\r\n
          note_content\r\n
          is_deleted\r\n
        }\r\n
        group_collection {\r\n
          organization_id\r\n
          department\r\n
          sub_department\r\n
          group_nickname\r\n
          group_description\r\n
          is_deleted\r\n
          fundraiser_collection{\r\n
            id\r\n
            group_id\r\n
            title\r\n
            description\r\n
            requested_book_quantity\r\n
            book_quantity_checked_out\r\n
            book_checked_out_total_value\r\n
            book_quantity_checked_in\r\n
            books_sold\r\n
            money_received\r\n
            start_date\r\n
            end_date\r\n
            coupon_book_id\r\n
            outstanding_balance\r\n
            is_deleted\r\n
            closed\r\n
            goal\r\n
          }\r\n
          }\r\n
          }\r\n
      Aggregates{\r\n
        total_groups: count(subquery: "query{group{id organization_id}}")\r\n
         total_fundraisers: count(subquery: "query{fundraiser{id group_id}}" ordering: "group_id")\r\n
        total_open_fundraisers: count(subquery: "query{group{organization_id{fundraiser_collection{group_id}}}" \r\n
          filter: " fundraiser_collection.closed=false"  ordering: "group_id")\r\n
        total_closed_fundraisers: count(subquery: "query{group{organization_id fundraiser_collection{group_id}}}" \r\n
          filter: " fundraiser_collection.closed=true" 
          ordering: "group_id")\r\n
        total_books_sold: sum(subquery: "query{fundraiser{books_sold group_id}}" 
          ordering: "id") \r\n
         total_outstanding_balance: sum(subquery: "query{fundraiser{outstanding_balance group_id}}" 
          ordering: "id")\r\n
        total_books_checked_out: count
        (subquery: "query{group{organization_id fundraiser_collection{group_id book_quantity_checked_out}}}" \r\n
          filter: " fundraiser_collection.closed=false" 
          ordering: "group_id")\r\n
         total_books_checked_in: count
        (subquery: "query{group{ organization_id fundraiser_collection{group_id book_quantity_checked_in}}}" \r\n
          filter: " fundraiser_collection.closed=false" 
          ordering: "group_id")\r\n
      }\r\n
    \r\n}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: query,
        variables: {},
    });
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
    };

    fetch(QUERY_URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log("Error getting data from Devii", error)
            res.sendStatus(500)
        });
    //     pool
    //         .query(
    //             `SELECT
    //       o.*,
    //       COALESCE(group_count.total_groups, 0) AS total_groups,
    //       COALESCE(fundraiser_count.total_fundraisers, 0) AS total_fundraisers,
    //       COALESCE(closed_fundraiser_count.total_closed_fundraisers, 0) AS total_closed_fundraisers,
    //       (COALESCE(fundraiser_count.total_fundraisers, 0) - COALESCE(closed_fundraiser_count.total_closed_fundraisers, 0)) AS total_active_fundraisers,
    //       COALESCE(total_books_sold.total_books_sold, 0) AS total_books_sold,
    //       COALESCE(total_outstanding_balance.total_outstanding_balance, 0) AS total_outstanding_balance,
    //       COALESCE(total_books_sold.total_books_sold, 0) * COALESCE(o.organization_earnings, 0) AS total_org_earnings,
    //       COALESCE(total_checked_out_books.total_checked_out_books, 0) AS total_checked_out_books,
    //       COALESCE(total_checked_in_books.total_checked_in_books, 0) AS total_checked_in_books
    //   FROM
    //       organization o
    //   LEFT JOIN (
    //       SELECT
    //           organization_id,
    //           COUNT(id) AS total_groups
    //       FROM
    //           "group"
    //       WHERE
    //           is_deleted = false
    //       GROUP BY
    //           organization_id
    //   ) AS group_count ON o.id = group_count.organization_id
    //   LEFT JOIN (
    //       SELECT
    //           g.organization_id,
    //           COUNT(f.id) AS total_fundraisers
    //       FROM
    //           "group" g
    //       LEFT JOIN
    //           fundraiser f ON g.id = f.group_id
    //       WHERE
    //           g.is_deleted = false AND f.is_deleted = false
    //       GROUP BY
    //           g.organization_id
    //   ) AS fundraiser_count ON o.id = fundraiser_count.organization_id
    //   LEFT JOIN (
    //       SELECT
    //           g.organization_id,
    //           COUNT(f.id) AS total_closed_fundraisers
    //       FROM
    //           "group" g
    //       LEFT JOIN
    //           fundraiser f ON g.id = f.group_id
    //       WHERE
    //           g.is_deleted = false AND f.is_deleted = false AND f.closed = true
    //       GROUP BY
    //           g.organization_id
    //   ) AS closed_fundraiser_count ON o.id = closed_fundraiser_count.organization_id
    //   LEFT JOIN (
    //       SELECT
    //           g.organization_id,
    //           SUM(f.books_sold) AS total_books_sold
    //       FROM
    //           "group" g
    //       LEFT JOIN
    //           fundraiser f ON g.id = f.group_id
    //       WHERE
    //           g.is_deleted = false AND f.is_deleted = false
    //       GROUP BY
    //           g.organization_id
    //   ) AS total_books_sold ON o.id = total_books_sold.organization_id
    //   LEFT JOIN (
    //       SELECT
    //           g.organization_id,
    //           SUM(f.outstanding_balance) AS total_outstanding_balance
    //       FROM
    //           "group" g
    //       LEFT JOIN
    //           fundraiser f ON g.id = f.group_id
    //       WHERE
    //           g.is_deleted = false AND f.is_deleted = false
    //       GROUP BY
    //           g.organization_id
    //   ) AS total_outstanding_balance ON o.id = total_outstanding_balance.organization_id
    //   LEFT JOIN (
    //       SELECT
    //           g.organization_id,
    //           SUM(f.book_quantity_checked_out) AS total_checked_out_books
    //       FROM
    //           "group" g
    //       LEFT JOIN
    //           fundraiser f ON g.id = f.group_id
    //       WHERE
    //           g.is_deleted = false AND f.is_deleted = false
    //       GROUP BY
    //           g.organization_id
    //   ) AS total_checked_out_books ON o.id = total_checked_out_books.organization_id
    //   LEFT JOIN (
    //       SELECT
    //           g.organization_id,
    //           COALESCE(SUM(f.book_quantity_checked_in), 0) AS total_checked_in_books
    //       FROM
    //           "group" g
    //       LEFT JOIN
    //           fundraiser f ON g.id = f.group_id
    //       WHERE
    //           g.is_deleted = false AND f.is_deleted = false
    //       GROUP BY
    //           g.organization_id
    //   ) AS total_checked_in_books ON o.id = total_checked_in_books.organization_id
    //   WHERE
    //       o.is_deleted = true
    //   ORDER BY
    //       o.organization_name ASC;`
    //         )
    //         .then((response) => {
    //             res.send(response.rows).status(200);
    //         })
    //         .catch((error) => {
    //             console.log("Error in archived Organizations GET route", error);
    //             res.sendStatus(500);
    //         });
});


// Can be used to update an archived organization
router.post("/:id", (req, res) => {
    const organization = req.body;
    const id = req.params.id
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n    mutation{\r\n
        update_organization(\r\n
          input: {\r\n
              organization_name: ${organization.organization_name}\r\n
            type: ${organization.type}\r\n
            address: ${organization.address}\r\n
            city: ${organization.city}\r\n
            state: ${organization.state}\r\n
            zip: ${organization.zip}\r\n
            primary_contact_first_name: ${organization.primary_contact_first_name}\r\n
            primary_contact_last_name: ${organization.primary_contact_last_name}\r\n
            primary_contact_phone:${organization.primary_contact_phone}\r\n
            primary_contact_email: ${organization.primary_contact_email}\r\n
            organization_logo: ${organization.organization_logo}\r\n
            is_deleted: ${organization.is_deleted}\r\n
            organization_earnings: ${organization.organization_earnings}\r\n
          }\r\n
          id: ${id}
        )  {\r\n
          organization_name\r\n
          type\r\n
          address\r\n
          city\r\n
          state\r\n
          zip\r\n
          primary_contact_first_name\r\n
          primary_contact_last_name\r\n
          primary_contact_phone\r\n
          primary_contact_email\r\n
          organization_logo\r\n
          is_deleted\r\n
          organization_earnings\r\n
        }\r\n
      }
      \r\n}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: query,
        variables: {},
    });
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
    };

    fetch(QUERY_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => {
            console.log("Error getting data from Devii", error)
            res.sendStatus(500)
        });
    // pool
    //     .query(`UPDATE "organization" SET is_deleted = false WHERE id = $1;`, [
    //         req.params.id,
    //     ])
    //     .then((response) => {
    //         res.sendStatus(200);
    //     })
    //     .catch((error) => {
    //         console.log("Error with organizations DELETE route", error);
    //         res.sendStatus(500);
    //     });
});

// router.put("/:id", (req, res) => {
//   const organization = req.body;
//   const queryText = `
//   UPDATE "organization" 
//   SET "organization_name" = $1, "type" = $2, "address" = $3,
//       "city" = $4,
//       "state" = $5,
//       "zip" = $6,
//       "primary_contact_first_name" = $7,
//       "primary_contact_last_name" = $8,
//       "primary_contact_phone" = $9,
//       "primary_contact_email" = $10,
//       "organization_logo" = $11
//   WHERE "id" = $12;`;
//   pool
//     .query(queryText, [
//       organization.organization_name,
//       organization.type,
//       organization.address,
//       organization.city,
//       organization.state,
//       organization.zip,
//       organization.primary_contact_first_name,
//       organization.primary_contact_last_name,
//       organization.primary_contact_phone,
//       organization.primary_contact_email,
//       organization.organization_logo,
//       req.params.id,
//     ])
//     .then((response) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log("error with organizations PUT route", err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
