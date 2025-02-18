const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");

let auth = async (req, res, next) => {
  //토큰을 request header에서 가져옴
  const authHeader = req.headers["authorization"];

  //bearer token
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    //토큰 유효한지 확인
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode:" + decode.userId);
    const user = await User.findOne({
      _id: decode.userId,
    });
    console.log("user:" + user);
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = { auth };
