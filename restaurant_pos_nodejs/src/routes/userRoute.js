const express = require("express");
const { register, login, logout, getUserData } = require("../controllers/userController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

// Authentication routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

// User Data routes
router.route("/").get(isVerifiedUser, getUserData);

module.exports = router;
