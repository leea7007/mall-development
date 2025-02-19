const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
  user: {
    type: Object,
  },
  data: {
    type: Array, // 결제모듈
    default: [],
  },
  product: {
    type: Array,
    default: [],
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
