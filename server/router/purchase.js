const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/:id", controller.getDetailPurchase);
router.post("/", controller.postPurchase);

module.exports = router;
