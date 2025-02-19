process.emitWarning = (warning, type, code, errno) => {
  // 경고 메시지가 MongoDB와 관련된 경고일 경우 무시
  if (warning && warning.includes("MONGODB DRIVER")) {
    return;
  }
  // 기본 경고 처리
  console.warn(warning);
};

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
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

app.use("/products", require("./routes/products"));

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
    const userData = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      image: user.image, // 필요한 데이터 추가
      cart: user.cart, // 예시
      history: user.history, // 예시
    };
    if (!user) {
      return res.status(400).json({ message: "사용자가 존재하지 않습니다." });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
    }
    res.status(200).json({ message: "로그인 성공", userData });
  } catch (err) {
    console.error("로그인 중 에러 발생:", err);
    res.status(500).json({ message: "서버 오류", error: err });
  }
});

app.get("/user/authUser", (req, res) => {
  res.json({ message: "인증에 성공했습니다." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
