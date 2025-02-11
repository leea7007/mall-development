const express = require("express");
const path = require("path"); //path 모듈을 사용하면 상대경로를 사용할 수 있음
const cors = require("cors");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://mallDevelopment:mall12345@project0.gvq59.mongodb.net/?retryWrites=true&w=majority&appName=project0"
  )
  .then(() => {
    console.log("MongoDB connected...");
    console.log("MONGO_URL:", process.env.MONGO_URL);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads"))); // __dirname은 현재 파일이 있는 경로

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  res.json({ message: "Post 요청이 완료되었습니다." });
});

//app.use(express.static("public")); //퍼블릭 안에 있는 정적인 파일을 사용할 수 있음
app.use(express.static(path.join(__dirname, "../uploads"))); // 앞쪽 ""은 라우트, 뒤쪽 uploads는 폴더명

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// express error handling
app.get("/error", (req, res) => {
  throw new Error("에러를 강제로 발생시켰습니다.");
});
app.get("/setImediate", (req, res, next) => {
  setImmediate(() => {
    next(new Error("setImmediate에서 에러를 발생시켰습니다."));
  });
});
app.get("*", (req, res) => {
  res.status(404).send("404 NOT FOUND");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.status || "Something broke!");
});
