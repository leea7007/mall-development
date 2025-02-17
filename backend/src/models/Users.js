const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    maxlength: 50,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 50,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: 5,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
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

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  let user = this;
  console.log(user); // user 객체 로그 확인

  // plainPassword와 암호화된 비밀번호 비교
  try {
    const isMatch = await bcrypt.compare(plainPassword, user.password);
    return isMatch; // 암호가 일치하면 true, 아니면 false
  } catch (err) {
    console.error("비밀번호 비교 중 오류 발생:", err);
    throw err; // 에러 발생 시 throw
  }
};

// User 모델을 직접 내보내는 방법
const User = mongoose.model("User", userSchema);
module.exports = User; // User만 내보내기
