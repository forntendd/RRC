const pool = require("../config/db");

const USER_SELECT_FIELDS =
  "id, firebase_uid, nickname, email, points, character_stage, created_at, updated_at";

function getDb(db) {
  return db || pool;
}

async function findUserByFirebaseUid(firebaseUid, db) {
  const [rows] = await getDb(db).query(
    `SELECT id, firebase_uid, nickname, email, points, character_stage, created_at, updated_at
     FROM users
     WHERE firebase_uid = ?
     LIMIT 1`,
    [firebaseUid]
  );

  return rows[0] || null;
}

async function findUserById(userId, db) {
  const [rows] = await getDb(db).query(
    `SELECT ${USER_SELECT_FIELDS}
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [userId]
  );

  return rows[0] || null;
}

async function createUser({ firebaseUid, email, nickname }, db) {
  const safeEmail = email || `${firebaseUid}@firebase.local`;
  const safeNickname = nickname || safeEmail.split("@")[0];

  const [result] = await getDb(db).query(
    `INSERT INTO users (firebase_uid, nickname, email, points, character_stage)
     VALUES (?, ?, ?, 0, 'egg')`,
    [firebaseUid, safeNickname, safeEmail]
  );

  return findUserById(result.insertId, db);
}

async function findOrCreateUserByFirebase({ firebaseUid, email, nickname }, db) {
  const existingUser = await findUserByFirebaseUid(firebaseUid, db);

  if (existingUser) {
    return existingUser;
  }

  return createUser({
    firebaseUid,
    email,
    nickname,
  }, db);
}

module.exports = {
  findOrCreateUserByFirebase,
  findUserByFirebaseUid,
  findUserById,
};
