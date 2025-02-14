const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:5173", // 프론트엔드 URL
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json()); // JSON 데이터 파싱

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// POST 요청: 사용자 등록
app.post("/user/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // 이미 있는 이메일인지 확인
    if (email === "test@example.com") {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
    }

    // 새로운 사용자 생성 (간단한 형태로 임시 사용자 생성)
    const newUser = { email, password, firstName, lastName };

    // 성공적으로 등록된 사용자 반환
    res.status(201).json({ message: "회원가입 성공", user: newUser });
  } catch (err) {
    console.error("회원가입 중 에러 발생:", err);
    res
      .status(500)
      .json({ message: "서버 오류, 다시 시도해 주세요.", error: err });
  }
});

// POST 요청: 사용자 로그인
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email !== "test@example.com") {
      return res.status(400).json({ message: "사용자가 존재하지 않습니다." });
    }

    if (password !== "password123") {
      return res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
    }

    res.status(200).json({
      message: "로그인 성공",
      user: { email, firstName: "John", lastName: "Doe" },
    });
  } catch (err) {
    console.error("로그인 중 에러 발생:", err);
    res.status(500).json({ message: "서버 오류", error: err });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
