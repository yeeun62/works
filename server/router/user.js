const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/", controller.userList);
router.get("/doc", controller.userDoc);
router.get("/userInfo", controller.userInfo);

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.get("/signout", controller.signout);

router.post("/pwcheck", controller.pwcheck);
router.post("/update", controller.update);

module.exports = router;
