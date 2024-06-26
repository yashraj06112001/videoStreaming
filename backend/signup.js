const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
app = new express();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "videostream",
  password: "1",
  port: 5432,
});
router.post("/signup", (req, res) => {
  const { name, id, email } = req.body;
  const user = { name, id, email };
  const query =
    "INSERT INTO broadcaster(name, personal_id, email) VALUES($1, $2, $3)";
  const values = [user.name, user.id, user.email];
  pool.query(query, values, (error, result) => {
    if (error) {
      console.error("Error executing query", error.stack);
      res.status(500).send("Server error");
    } else {
      res.status(200).send("User added successfully");
    }
  });
});
module.exports = router;
