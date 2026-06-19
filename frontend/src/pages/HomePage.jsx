import { Link } from "react-router-dom";

import CharacterCard from "../components/CharacterCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function HomePage() {
  const { dbUser } = useAuth();

  return (
    <div className="page-grid">
      <CharacterCard user={dbUser} />
      <section className="action-panel">
        <p className="eyebrow">다음 행동</p>
        <h2>꿀 따러가기</h2>
        <p className="muted">
          질문을 작성하면 10P, 답변을 작성하면 20P를 얻습니다.
        </p>
        <Link className="primary-button inline-link" to="/board">
          꿀 따러가기
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
