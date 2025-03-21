const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const login = require("../controllers/auth/login.js");
const signup = require("../controllers/auth/signup.js");
const getUser = require("../controllers/auth/getUser.js");

const imageUpload = require("../middlewares/imageUpload.js");

router.post("/login", login);
router.post("/signup", imageUpload.single("profileImage"), [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("location", "Enter a Valid Location").exists() ,
    body("password", "Password must be of 8 characters").isLength({ min: 8 })
], signup);
router.post("/getuser", getUser);

module.exports = router;