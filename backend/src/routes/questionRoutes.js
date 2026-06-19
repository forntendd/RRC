const express = require("express");

const {
  createAnswerHandler,
  createQuestionHandler,
  getAnswersHandler,
  getQuestionByIdHandler,
  getQuestionsHandler,
} = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getQuestionsHandler);
router.post("/", authMiddleware, createQuestionHandler);
router.get("/:id", getQuestionByIdHandler);
router.get("/:id/answers", getAnswersHandler);
router.post("/:id/answers", authMiddleware, createAnswerHandler);

module.exports = router;
