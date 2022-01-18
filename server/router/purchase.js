const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/:purchaseId", controller.getDetailPurchase);

router.post("/request", controller.purchaseRequest);
router.post("/", controller.postPurchase);

module.exports = router;
