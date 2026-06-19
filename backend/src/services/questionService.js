const pool = require("../config/db");
const { awardPoints } = require("./pointService");

async function createQuestion({ userId, title, content, category }) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO questions (user_id, title, content, category)
       VALUES (?, ?, ?, ?)`,
      [userId, title, content, category]
    );

    const updatedUser = await awardPoints(connection, {
      userId,
      actionType: "CREATE_QUESTION",
      pointChange: 10,
    });

    await connection.commit();

    return {
      questionId: result.insertId,
      user: updatedUser,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function getQuestions() {
  const [rows] = await pool.query(
    `SELECT
       q.id,
       q.user_id,
       u.nickname AS author_nickname,
       q.title,
       q.content,
       q.category,
       q.created_at,
       q.updated_at,
       COUNT(a.id) AS answer_count
     FROM questions q
     JOIN users u ON u.id = q.user_id
     LEFT JOIN answers a ON a.question_id = q.id
     GROUP BY q.id, q.user_id, u.nickname, q.title, q.content, q.category, q.created_at, q.updated_at
     ORDER BY q.created_at DESC`
  );

  return rows;
}

async function getQuestionById(questionId) {
  const [rows] = await pool.query(
    `SELECT
       q.id,
       q.user_id,
       u.nickname AS author_nickname,
       q.title,
       q.content,
       q.category,
       q.created_at,
       q.updated_at
     FROM questions q
     JOIN users u ON u.id = q.user_id
     WHERE q.id = ?
     LIMIT 1`,
    [questionId]
  );

  return rows[0] || null;
}

module.exports = {
  createQuestion,
  getQuestionById,
  getQuestions,
};
