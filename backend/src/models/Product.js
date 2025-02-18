const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({});

const User = mongoose.model("Product", userSchema);

module.exports = User;
