const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const getBlogs = require("../controllers/blog/getBlogs.js");
const composeBlog = require("../controllers/blog/composeBlog.js");
const deleteBlog = require("../controllers/blog/deleteBlog.js");
const getBlog = require("../controllers/blog/getBlog.js");
const myBlogs = require("../controllers/blog/myBlogs.js");

const fetchUser = require("../middlewares/fetchUser.js");
const imageUpload = require("../middlewares/imageUpload.js");

router.post("/", getBlogs);
router.post("/compose", fetchUser, imageUpload.single("coverImage"), [
    body("title", "Title Must be of 10 Characters at least!").isLength({ min: 10 }),
    body("category", "Category cannot be Empty!").exists(),
    body("content", "Content must be of 100 Characters at least").isLength({min: 100})
], composeBlog);
router.post("/delete/:id", fetchUser, deleteBlog);
router.post("/myblogs", fetchUser, myBlogs);
router.post("/blog/:id", getBlog);

module.exports = router;