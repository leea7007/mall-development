const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/Users"); // { User }에서 User로 변경
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://leea7007:1029@cluster0.grjz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log("MongoDB 연결 오류:", err);
  });
console.log("mongo url:", process.env.MONGO_URL);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", (req, res) => {
  res.json({ message: "GET 요청이 완료되었습니다." });
});

app.post("/user/test", (req, res) => {
  res.json({ message: "POST 요청이 완료되었습니다." });
});

// app.post("/user/register", async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   console.log("받은 데이터:", req.body);
//   try {
//     // 이미 있는 이메일인지 확인 해결 전까지 일단 주석처리
//     console.log("User 모델 확인:", User);

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
//     }

//     // 새로운 사용자 생성
//     const newUser = new User({
//       email,
//       password,
//       firstName,
//       lastName,
//     });
//     console.log("새로운 사용자:", newUser);
//     // 데이터베이스에 저장
//     await newUser.save();
//     console.log("저장 완료");
//     // 성공적으로 저장되면 응답
//     res.status(201).json({ message: "회원가입 성공", user: newUser });
//   } catch (err) {
//     console.error("회원가입 중 에러 발생:", err); // 여기서 발생한 에러를 콘솔에 출력
//     res
//       .status(500)
//       .json({ message: "서버 오류, 다시 시도해 주세요.", error: err });
//   }
// });

app.use("/user", require("./routes/users"));

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "사용자가 존재하지 않습니다." });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
    }

    res.status(200).json({ message: "로그인 성공", user });
  } catch (err) {
    console.error("로그인 중 에러 발생:", err);
    res.status(500).json({ message: "서버 오류", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
