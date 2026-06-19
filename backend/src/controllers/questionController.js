const {
  createQuestion,
  getQuestionById,
  getQuestions,
} = require("../services/questionService");
const {
  createAnswer,
  getAnswersByQuestionId,
} = require("../services/answerService");

function requireText(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    const error = new Error(`${fieldName} is required`);
    error.statusCode = 400;
    throw error;
  }

  return value.trim();
}

async function createQuestionHandler(req, res, next) {
  try {
    const title = requireText(req.body.title, "title");
    const content = requireText(req.body.content, "content");
    const category = requireText(req.body.category, "category");

    const result = await createQuestion({
      userId: req.user.id,
      title,
      content,
      category,
    });

    const question = await getQuestionById(result.questionId);

    res.status(201).json({
      question,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

async function getQuestionsHandler(req, res, next) {
  try {
    const questions = await getQuestions();

    res.json({
      questions,
    });
  } catch (error) {
    next(error);
  }
}

async function getQuestionByIdHandler(req, res, next) {
  try {
    const question = await getQuestionById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.json({
      question,
    });
  } catch (error) {
    next(error);
  }
}

async function createAnswerHandler(req, res, next) {
  try {
    const content = requireText(req.body.content, "content");

    const result = await createAnswer({
      questionId: req.params.id,
      userId: req.user.id,
      content,
    });

    const answers = await getAnswersByQuestionId(req.params.id);
    const answer = answers.find((item) => item.id === result.answerId);

    res.status(201).json({
      answer,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

async function getAnswersHandler(req, res, next) {
  try {
    const question = await getQuestionById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const answers = await getAnswersByQuestionId(req.params.id);

    res.json({
      answers,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAnswerHandler,
  createQuestionHandler,
  getAnswersHandler,
  getQuestionByIdHandler,
  getQuestionsHandler,
};
