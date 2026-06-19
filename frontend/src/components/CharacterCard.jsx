const stageLabels = {
  egg: "알",
  cracked_egg: "금 간 알",
  hatching_egg: "부화 직전",
  character_1: "캐릭터 1",
  character_2: "캐릭터 2",
  character_3: "캐릭터 3",
};

const stageIcons = {
  egg: "O",
  cracked_egg: "o",
  hatching_egg: "*",
  character_1: "A",
  character_2: "B",
  character_3: "C",
};

function CharacterCard({ user }) {
  const stage = user?.character_stage || user?.characterStage || "egg";
  const points = user?.points || 0;

  return (
    <section className="character-panel">
      <div className={`character-avatar stage-${stage}`}>
        {stageIcons[stage] || "O"}
      </div>
      <div>
        <p className="eyebrow">내 캐릭터</p>
        <h1>{stageLabels[stage] || stage}</h1>
        <p className="muted">보유 포인트 {points}P</p>
      </div>
    </section>
  );
}

export default CharacterCard;
