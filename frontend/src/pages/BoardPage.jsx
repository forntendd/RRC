import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createQuestion, getQuestions } from "../api/questionApi";
import { useAuth } from "../context/AuthContext.jsx";

function BoardPage() {
  const { setDbUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);

    try {
      const data = await createQuestion({
        title,
        content,
        category: category || "general",
      });
      setDbUser(data.user);
      setTitle("");
      setCategory("");
      setContent("");
      await loadQuestions();
    } catch (submitError) {
      setError("질문 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="board-page">
      <section className="board-header">
        <p className="eyebrow">꿀 게시판</p>
        <h1>궁금한 것을 남기고 꿀을 모아보세요</h1>
        <p className="muted">질문 작성은 10P, 답변 작성은 20P입니다.</p>
      </section>

      <div className="board-layout">
        <section className="composer">
          <h2>질문 작성</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              제목
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="예: React 라우팅은 어떻게 하나요?"
                required
              />
            </label>
            <label>
              카테고리
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="frontend, backend, database..."
              />
            </label>
            <label>
              내용
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="질문 내용을 자세히 작성해주세요."
                required
                rows={7}
              />
            </label>
            {error && <p className="error-text">{error}</p>}
            <button className="primary-button" type="submit" disabled={submitting}>
              {submitting ? "올리는 중..." : "질문 올리기 +10P"}
            </button>
          </form>
        </section>

        <section className="list-panel">
          <div className="section-title">
            <h2>질문 목록</h2>
            <span>{questions.length}개</span>
          </div>
          {loading ? (
            <p className="muted">불러오는 중...</p>
          ) : questions.length === 0 ? (
            <div className="empty-state">
              <strong>아직 질문이 없습니다.</strong>
              <p className="muted">첫 질문을 올리고 꿀을 받아보세요.</p>
            </div>
          ) : (
            <div className="question-list">
              {questions.map((question) => (
                <Link
                  className="question-card"
                  key={question.id}
                  to={`/questions/${question.id}`}
                >
                  <div className="question-card-top">
                    <span className="chip">{question.category}</span>
                    <span className="answer-count">답변 {question.answer_count}</span>
                  </div>
                  <strong>{question.title}</strong>
                  <p>{question.content}</p>
                  <span className="muted">작성자 {question.author_nickname}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default BoardPage;
