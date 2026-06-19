const express = require("express");

const pool = require("../config/db");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "rrc-backend",
  });
});

router.get("/db", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    next({
      statusCode: 500,
      message: "Database connection failed",
    });
  }
});

module.exports = router;
