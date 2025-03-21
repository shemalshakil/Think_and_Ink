const Blog = require("../../models/Blog.js");

const getBlogs = async (req, res) => {
    var success = false;
    try {
        const blogs = await Blog.aggregate([
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

module.exports = getBlogs;