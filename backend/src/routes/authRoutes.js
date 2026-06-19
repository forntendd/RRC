const express = require("express");

const { getMe, syncUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.post("/sync-user", authMiddleware, syncUser);

module.exports = router;
