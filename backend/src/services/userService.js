const pool = require("../config/db");

async function findUserByFirebaseUid(firebaseUid) {
  const [rows] = await pool.query(
    `SELECT id, firebase_uid, nickname, email, points, character_stage, created_at, updated_at
     FROM users
     WHERE firebase_uid = ?
     LIMIT 1`,
    [firebaseUid]
  );

  return rows[0] || null;
}

async function createUser({ firebaseUid, email, nickname }) {
  const safeEmail = email || `${firebaseUid}@firebase.local`;
  const safeNickname = nickname || safeEmail.split("@")[0];

  const [result] = await pool.query(
    `INSERT INTO users (firebase_uid, nickname, email, points, character_stage)
     VALUES (?, ?, ?, 0, 'egg')`,
    [firebaseUid, safeNickname, safeEmail]
  );

  const [rows] = await pool.query(
    `SELECT id, firebase_uid, nickname, email, points, character_stage, created_at, updated_at
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return rows[0];
}

async function findOrCreateUserByFirebase({ firebaseUid, email, nickname }) {
  const existingUser = await findUserByFirebaseUid(firebaseUid);

  if (existingUser) {
    return existingUser;
  }

  return createUser({
    firebaseUid,
    email,
    nickname,
  });
}

module.exports = {
  findOrCreateUserByFirebase,
  findUserByFirebaseUid,
};
