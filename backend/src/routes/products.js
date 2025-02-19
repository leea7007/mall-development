const Product = require("../models/Product");
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const multer = require("multer");

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("file");

// 제품 업로드 라우트
router.post("/image", upload, auth, async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "파일이 업로드되지 않았습니다." });
    }

    return res.json({ fileName: req.file.filename, filePath: req.file.path });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
