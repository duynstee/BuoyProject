// routes/apiRoutes.js
const express = require("express");
const router = express.Router();
const { connectToOracle } = require("oracleDB.js"); // Import the Oracle DB connection function

// Example route to fetch data from Oracle DB
router.get("/data", async (req, res) => {
  let connection;
  try {
    connection = await connectToOracle(); // Get the DB connection

    // Sample query (modify based on your schema)
    const result = await connection.execute("SELECT * FROM DEV_USER.Metingen");
    res.json(result.rows); // Send data as JSON response
  } catch (err) {
    console.error("Error fetching data from Oracle DB:", err);
    res.status(500).send("Error fetching data from Oracle DB");
  } finally {
    if (connection) {
      try {
        await connection.close(); // Close the connection
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

module.exports = router;
