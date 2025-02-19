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

    await product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      findArgs[key] = req.query.filters[key];
    }
    console.log("findArgs: ", findArgs);
  }
  try {
    const products = await Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal ? true : false;
    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
