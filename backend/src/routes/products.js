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
  const term = req.query.searchTerm;
  let findArgs = {};

  if (term) {
    findArgs["$text"] = { $search: term };
  }
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          // greater than equal
          $gte: req.query.filters[key][0],
          // less than equal
          $lte: req.query.filters[key][1],
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
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

router.get("/:id", async (req, res, next) => {
  const type = req.query.type;
  let productIds = req.params.id; // < /:id

  // using productID, get data from DB names same

  try {
    if (typeof productIds === "string") {
      productIds = productIds.split(",");
    }

    const product = await Product.find({ _id: { $in: productIds } }).populate(
      "writer"
    );

    return res.status(200).send(product);
  } catch (error) {
    console.error("DB 조회 중 오류 발생:", error);
  }
});

module.exports = router;
