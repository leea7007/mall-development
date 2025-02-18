const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res, next) => {
  try {
    const { email } = req.body;

    // 이메일 중복 체크
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
    }

    // 새로운 사용자 생성 및 저장
    const user = new User(req.body);
    await user.save();

    return res.status(201).json({ success: true, message: "회원가입 성공" });
  } catch (err) {
    next(err); // 에러 핸들링 미들웨어로 전달
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // 이메일이 없는 경우
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    console.log("입력된 비밀번호:", req.body.password);
    console.log("저장된 비밀번호:", user.password);

    // 비밀번호가 일치하지 않는 경우
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("비밀번호 일치 여부:", isMatch);

    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    const payload = { userId: user._id.toHexString() }; //MongoDB의 ObjectID를 문자열로 변환

    // 토큰 생성
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // 1 hour limit
    });

    console.log("Login successful:", { userId: user._id, accessToken });
    return res.json({ loginSuccess: true, userId: user._id, accessToken });
  } catch (err) {
    console.log("Login error:", err);
    next(err);
  }
});

router.get("/authUser", auth, (req, res) => {
  res.send("인증");
  return res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/logout", auth, (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
