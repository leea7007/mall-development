const express = require("express");
const router = express.Router();

router.post("/users/register", (req, res) => {
  res.send("회원가입");
  try {
    const user = new User(req.body);
    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  } catch {
    console.error("회원가입 중 에러 발생:", err); // 여기서 발생한 에러를 콘솔에 출력
    res
      .status(500)
      .json({ message: "서버 오류, 다시 시도해 주세요.", error: err });
  }
});

router.post("/users/login", (req, res) => {
  res.send("로그인");
});

router.post("/users/auth", (req, res) => {
  res.send("인증");
});

router.post("/users/logout", (req, res) => {
  res.send("로그아웃");
});

module.exports = router;
