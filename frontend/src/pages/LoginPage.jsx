import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const { hasFirebaseConfig, isAuthenticated, loading, login, register } =
    useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!loading && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register({ email, password, nickname });
      }

      const destination = location.state?.from?.pathname || "/home";
      navigate(destination, { replace: true });
    } catch (submitError) {
      setError("이메일, 비밀번호 또는 Firebase 설정을 확인해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div>
          <p className="eyebrow">RRC</p>
          <h1>로그인</h1>
          <p className="muted">질문하고 답변하며 캐릭터를 성장시켜보세요.</p>
        </div>

        {!hasFirebaseConfig && (
          <p className="notice-text">
            Firebase 설정이 아직 없습니다. `.env.example`을 `.env`로 복사하고
            Firebase 웹 앱 값을 넣으면 로그인할 수 있습니다.
          </p>
        )}

        <div className="segmented">
          <button
            className={mode === "login" ? "active" : ""}
            type="button"
            onClick={() => setMode("login")}
          >
            로그인
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            type="button"
            onClick={() => setMode("register")}
          >
            회원가입
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              닉네임
              <input
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="닉네임"
                required
              />
            </label>
          )}
          <label>
            이메일
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="6자 이상"
              required
              minLength={6}
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button
            className="primary-button"
            type="submit"
            disabled={submitting || !hasFirebaseConfig}
          >
            {submitting ? "처리 중..." : mode === "login" ? "로그인" : "회원가입"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
