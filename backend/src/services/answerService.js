const pool = require("../config/db");
const { awardPoints } = require("./pointService");

async function createAnswer({ questionId, userId, content }) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [questionRows] = await connection.query(
      `SELECT id
       FROM questions
       WHERE id = ?
       LIMIT 1`,
      [questionId]
    );

    if (!questionRows[0]) {
      const error = new Error("Question not found");
      error.statusCode = 404;
      throw error;
    }

    const [result] = await connection.query(
      `INSERT INTO answers (question_id, user_id, content)
       VALUES (?, ?, ?)`,
      [questionId, userId, content]
    );

    const updatedUser = await awardPoints(connection, {
      userId,
      actionType: "CREATE_ANSWER",
      pointChange: 20,
    });

    await connection.commit();

    return {
      answerId: result.insertId,
      user: updatedUser,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function getAnswersByQuestionId(questionId) {
  const [rows] = await pool.query(
    `SELECT
       a.id,
       a.question_id,
       a.user_id,
       u.nickname AS author_nickname,
       a.content,
       a.created_at,
       a.updated_at
     FROM answers a
     JOIN users u ON u.id = a.user_id
     WHERE a.question_id = ?
     ORDER BY a.created_at ASC`,
    [questionId]
  );

  return rows;
}

module.exports = {
  createAnswer,
  getAnswersByQuestionId,
};
