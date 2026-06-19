const getFirebaseAdmin = require("../config/firebaseAdmin");
const { findOrCreateUserByFirebase } = require("../services/userService");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token is required",
      });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const admin = getFirebaseAdmin();
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const user = await findOrCreateUserByFirebase({
      firebaseUid: decodedToken.uid,
      email: decodedToken.email,
      nickname: decodedToken.name || decodedToken.email?.split("@")[0] || "user",
    });

    req.firebaseUser = decodedToken;
    req.user = user;

    next();
  } catch (error) {
    next({
      statusCode: 401,
      message: "Invalid or expired Firebase ID token",
    });
  }
}

module.exports = authMiddleware;
