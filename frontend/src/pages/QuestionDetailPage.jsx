import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { createAnswer, getAnswers, getQuestion } from "../api/questionApi";
import { useAuth } from "../context/AuthContext.jsx";

function QuestionDetailPage() {
  const { id } = useParams();
  const { setDbUser } = useAuth();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadDetail() {
    const [questionData, answerData] = await Promise.all([
      getQuestion(id),
      getAnswers(id),
    ]);
    setQuestion(questionData.question);
    setAnswers(answerData.answers);
  }

  useEffect(() => {
    loadDetail()
      .catch(() => setError("질문 정보를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const data = await createAnswer(id, { content });
      setDbUser(data.user);
      setContent("");
      await loadDetail();
    } catch (submitError) {
      setError("답변 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="muted">불러오는 중...</p>;
  }

  if (!question) {
    return (
      <section className="list-panel">
        <p className="error-text">{error || "질문을 찾을 수 없습니다."}</p>
        <Link className="back-link" to="/board">
          게시판으로 돌아가기
        </Link>
      </section>
    );
  }

  return (
    <div className="detail-layout">
      <Link className="back-link" to="/board">
        ← 게시판으로
      </Link>

      <article className="question-detail">
        <span className="chip">{question.category}</span>
        <h1>{question.title}</h1>
        <p className="muted">작성자 {question.author_nickname}</p>
        <p className="question-body">{question.content}</p>
      </article>

      <section className="answer-panel">
        <div className="section-title">
          <h2>답변 작성</h2>
          <span>+20P</span>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="도움이 되는 답변을 남겨주세요."
            required
            rows={5}
          />
          {error && <p className="error-text">{error}</p>}
          <button className="primary-button" type="submit" disabled={submitting}>
            {submitting ? "올리는 중..." : "답변 올리기"}
          </button>
        </form>
      </section>

      <section className="list-panel">
        <div className="section-title">
          <h2>답변 목록</h2>
          <span>{answers.length}개</span>
        </div>
        {answers.length === 0 ? (
          <div className="empty-state">
            <strong>아직 답변이 없습니다.</strong>
            <p className="muted">첫 답변을 남기고 20P를 받아보세요.</p>
          </div>
        ) : (
          <div className="answer-list">
            {answers.map((answer) => (
              <article className="answer-item" key={answer.id}>
                <strong>{answer.author_nickname}</strong>
                <p>{answer.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default QuestionDetailPage;
