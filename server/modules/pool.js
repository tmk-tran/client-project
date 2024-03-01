const pg = require("pg");

let config = {};

if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
  };
} else {
  config = {
    database: "psg_project",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

const pool = new pg.Pool(config);

pool.on("connect", () => console.log("Connected to postgres"));

pool.on("error", (err) => console.log("Error in connecting to postgres", err));

module.exports = pool;