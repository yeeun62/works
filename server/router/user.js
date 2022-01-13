const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/", controller.userList);
router.get("/doc", controller.userDoc);

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.get("/signout", controller.signout);

module.exports = router;
