const Blog = require("../../models/Blog.js");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const composeBlog = async (req, res) => {
    var success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(200).json({  success: success, message: errors.array()[0].msg })
    }
    try {
        if (!req.file) {
            return res.status(200).json({ success: success, message: "No Cover Image Uploaded!" });
        }
        var blog = await Blog.create({
                user: req.user.id,
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                coverImage: {
                    data: fs.readFileSync(path.join(__dirname + '/../../images/' + req.file.filename)),
                    contentType: req.file.mimetype,
                }
            }
        );
        blog = await Blog.aggregate([{$match:{ _id: blog._id }},
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "UserInfo"
                }
            }, {
                $project: {
                    title: 1,
                    category: 1,
                    content: 1,
                    coverImage: 1,
                    date: 1,
                    _id: 1,
                    "UserInfo.name": 1,
                    "UserInfo.profileImage": 1,
                    "UserInfo._id": 1
                }
            }
        ])
        fs.rm(path.join(__dirname + '/../../images/' + req.file.filename) ,(err)=>{console.log(err)});
        success = true;
        return res.status(200).json({ success: success, blog: blog, message: "Successfully Added a New Blog!"});
    } catch (error) {
        fs.rm(path.join(__dirname + '/../../images/' + req.file.filename) ,(err)=>{console.log(err)});
        return res.status(200).json({ success: success, message:"Internal Server Error!"});
    }
}

module.exports = composeBlog;