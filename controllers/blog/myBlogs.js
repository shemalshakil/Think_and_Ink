const Blog = require("../../models/Blog.js");
const mongoose = require("mongoose");

const myBlogs = async (req, res) => {
    var success = false;
    const id = mongoose.Types.ObjectId(req.user.id)
    try {
        if(req.user.id!==req.body.id){
            return res.status(200).json({ success: success, "Error!": "Cannot Fetch Others Blog" });
        }
        const blogs = await Blog.aggregate([{$match:{user: id}},
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
        success = true;
        return res.status(200).json({ success: success, blogs: blogs, "Success!": "Blogs Fetched Sucessfully!" });
    } catch (error) {
        return res.status(200).json({ success: success, "Internal Server Error!": error.message });
    }
}

module.exports = myBlogs;