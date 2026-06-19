import { Link } from "react-router-dom";

import CharacterCard from "../components/CharacterCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function HomePage() {
  const { dbUser } = useAuth();

  return (
    <div className="home-page">
      <CharacterCard user={dbUser} />
      <section className="growth-guide">
        <p className="eyebrow">성장 규칙</p>
        <div className="growth-steps">
          <span>🥚 0P</span>
          <span>🐣 100P</span>
          <span>🐥 300P</span>
          <span>✨ 500P</span>
        </div>
        <p className="muted">
          질문을 작성하면 10P, 답변을 작성하면 20P가 쌓입니다.
        </p>
      </section>
      <Link className="floating-honey-button" to="/board">
        🍯 꿀 따러가기
      </Link>
    </div>
  );
}

export default HomePage;
