import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createQuestion, getQuestions } from "../api/questionApi";
import { useAuth } from "../context/AuthContext.jsx";

function BoardPage() {
  const { setDbUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadQuestions() {
    const data = await getQuestions();
    setQuestions(data.questions);
  }

  useEffect(() => {
    loadQuestions()
      .catch(() => setError("질문 목록을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await createQuestion({ title, content, category });
      setDbUser(data.user);
      setTitle("");
      setCategory("general");
      setContent("");
      await loadQuestions();
    } catch (submitError) {
      setError("질문 작성에 실패했습니다.");
    }
  }

  return (
    <div className="board-layout">
      <section className="composer">
        <h1>질문 작성</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            제목
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="궁금한 점을 적어주세요"
              required
            />
          </label>
          <label>
            카테고리
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="general">일반</option>
              <option value="frontend">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="database">데이터베이스</option>
            </select>
          </label>
          <label>
            내용
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="질문 내용을 작성하세요"
              required
              rows={6}
            />
          </label>
          <button className="primary-button" type="submit">
            질문 올리기
          </button>
        </form>
      </section>

      <section className="list-panel">
        <h1>질문 목록</h1>
        {error && <p className="error-text">{error}</p>}
        {loading ? (
          <p className="muted">불러오는 중...</p>
        ) : questions.length === 0 ? (
          <p className="muted">아직 질문이 없습니다.</p>
        ) : (
          <div className="question-list">
            {questions.map((question) => (
              <Link
                className="question-item"
                key={question.id}
                to={`/questions/${question.id}`}
              >
                <span className="chip">{question.category}</span>
                <strong>{question.title}</strong>
                <span className="muted">
                  {question.author_nickname} · 답변 {question.answer_count}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BoardPage;
