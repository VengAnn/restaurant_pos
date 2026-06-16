const express = require("express");
const { getMenuItems, addMenuItem } = require("../controllers/menuController");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");

router.route("/").get(isVerifiedUser, getMenuItems);
router.route("/").post(isVerifiedUser, addMenuItem);

module.exports = router;
