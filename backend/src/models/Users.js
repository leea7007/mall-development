const mongoose = require("mongoose");

const Schema = mongoose.Schema; // mongoose의 Schema 생성자를 가져옴

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // trim은 빈칸 없애는 기능
  },
  password: {
    type: String,
    minLength: 5,
    required: true,
  },
  role: {
    type: Number,
    default: 0, // 0: 일반 사용자, 1: 관리자
  },
  image: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
