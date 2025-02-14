import React, { useState } from "react";
import request from "superagent"; // superagent 임포트

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Login user function
  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await request
        .post("http://localhost:8080/user/login") // API URL
        .send({
          email: "test@example.com", // hardcoded for testing
          password: "password123", // hardcoded for testing
        })
        .set("Content-Type", "application/json"); // 헤더 설정
      console.log(response.body); // 성공적인 로그인 응답
    } catch (error) {
      console.error(error.response ? error.response.body : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await request
        .post("http://localhost:8080/user/register") // API URL
        .send({ email, password }) // 전달할 데이터
        .set("Content-Type", "application/json"); // 헤더 설정
      console.log("Response:", response.body); // 성공적인 등록 응답
    } catch (err) {
      console.error("Error:", err.response ? err.response.body : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "등록 중..." : "회원가입"}
        </button>
      </form>

      {/* Optional: You can call loginUser after registration or add a separate login form */}
      <button onClick={loginUser} disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </button>
    </div>
  );
}

export default App;
