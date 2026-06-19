const CHARACTER_STAGES = ["character_1", "character_2", "character_3"];

function isFinalCharacterStage(characterStage) {
  return CHARACTER_STAGES.includes(characterStage);
}

function getRandomFinalCharacterStage() {
  const index = Math.floor(Math.random() * CHARACTER_STAGES.length);

  return CHARACTER_STAGES[index];
}

function calculateCharacterStage(points, currentStage) {
  if (points >= 500) {
    if (isFinalCharacterStage(currentStage)) {
      return currentStage;
    }

    return getRandomFinalCharacterStage();
  }

  if (points >= 300) {
    return "hatching_egg";
  }

  if (points >= 100) {
    return "cracked_egg";
  }

  return "egg";
}

module.exports = {
  calculateCharacterStage,
  isFinalCharacterStage,
};
