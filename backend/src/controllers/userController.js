function getCurrentUser(req, res) {
  const { nickname, email, points, character_stage: characterStage } = req.user;

  res.json({
    user: {
      nickname,
      email,
      points,
      characterStage,
    },
  });
}

module.exports = {
  getCurrentUser,
};
