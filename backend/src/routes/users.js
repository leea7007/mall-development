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

    // 비밀번호가 일치하지 않는 경우
    const isMatch = await bcrypt.compare(req.body.password, user.password);

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

    return res.json({ loginSuccess: true, userId: user._id, accessToken });
  } catch (err) {
    console.log("Login error:", err);
    next(err);
  }
});

router.get("/authUser", auth, (req, res) => {
  res.status(200).json({
    _id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/logout", auth, (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post("/cart", auth, async (req, res, next) => {
  try {
    //먼저 user collecion에 유저정보 가져오기
    const userInfo = await User.findOne({ _id: req.user._id });

    //이미 장바구니에 있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });
    //이미 상품 있을 시
    if (duplicate) {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true } //이거 넣어야 업데이트 됨
      );
      return res.status(200).send(user.cart);
    }
    //상품 이미 있지 않을 시
    else {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true }
      );
      return res.status(201).send(user.cart);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
