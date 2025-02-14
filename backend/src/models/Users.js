const mongoose = require("mongoose");

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

// User 모델을 직접 내보내는 방법
const User = mongoose.model("User", userSchema);
module.exports = User; // User만 내보내기
