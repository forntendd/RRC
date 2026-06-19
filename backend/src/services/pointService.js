const { calculateCharacterStage } = require("./characterService");
const { findUserById } = require("./userService");

async function awardPoints(db, { userId, actionType, pointChange }) {
  const [userRows] = await db.query(
    `SELECT id, points, character_stage
     FROM users
     WHERE id = ?
     FOR UPDATE`,
    [userId]
  );

  const user = userRows[0];

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const nextPoints = user.points + pointChange;
  const nextCharacterStage = calculateCharacterStage(
    nextPoints,
    user.character_stage
  );

  await db.query(
    `UPDATE users
     SET points = ?, character_stage = ?
     WHERE id = ?`,
    [nextPoints, nextCharacterStage, userId]
  );

  await db.query(
    `INSERT INTO point_logs (user_id, action_type, point_change)
     VALUES (?, ?, ?)`,
    [userId, actionType, pointChange]
  );

  return findUserById(userId, db);
}

module.exports = {
  awardPoints,
};
