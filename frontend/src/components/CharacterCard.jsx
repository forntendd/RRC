const stageLabels = {
  egg: "알",
  cracked_egg: "금이 간 알",
  hatching_egg: "부화 중",
  character_1: "꿀벌 친구",
  character_2: "꿀단지 친구",
  character_3: "숲속 친구",
};

const stageDescriptions = {
  egg: "작은 시작이에요. 꿀을 모으면 곧 변화가 생깁니다.",
  cracked_egg: "알에 금이 갔어요. 성장이 시작됐습니다.",
  hatching_egg: "곧 깨어날 것 같아요. 조금만 더 모아보세요.",
  character_1: "질문과 답변으로 태어난 첫 번째 캐릭터입니다.",
  character_2: "500P를 넘기며 배정된 든든한 캐릭터입니다.",
  character_3: "500P를 넘기며 배정된 날렵한 캐릭터입니다.",
};

const stageIcons = {
  egg: "🥚",
  cracked_egg: "🐣",
  hatching_egg: "🐥",
  character_1: "🐝",
  character_2: "🐻",
  character_3: "🦊",
};

function CharacterCard({ user }) {
  const stage = user?.character_stage || user?.characterStage || "egg";
  const points = user?.points || 0;
  const nickname = user?.nickname || "새싹 사용자";

  return (
    <section className="home-hero" aria-label="내 캐릭터 정보">
      <div className="honey-dots" aria-hidden="true" />
      <div className={`character-avatar stage-${stage}`}>
        <span>{stageIcons[stage] || "🥚"}</span>
      </div>
      <div className="character-copy">
        <p className="eyebrow">내 캐릭터</p>
        <h1>{nickname}</h1>
        <p className="stage-name">{stageLabels[stage] || stage}</p>
        <p className="muted">{stageDescriptions[stage] || "성장 중입니다."}</p>
      </div>
      <div className="stat-row">
        <div className="stat-card">
          <span>현재 포인트</span>
          <strong>{points}P</strong>
        </div>
        <div className="stat-card">
          <span>성장 단계</span>
          <strong>{stageLabels[stage] || stage}</strong>
        </div>
      </div>
    </section>
  );
}

export default CharacterCard;
