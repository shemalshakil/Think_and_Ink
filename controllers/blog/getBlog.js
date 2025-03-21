const { default: mongoose } = require("mongoose");
const Blog = require("../../models/Blog.js");

const getBlog = async (req, res) => {
    var success = false;
    const id = mongoose.Types.ObjectId(req.params.id)
    try {
        const blog = await Blog.aggregate([{$match:{ _id: id }},
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
                    "UserInfo.email": 1,
                    "UserInfo._id": 1
                }
            }
        ])
        success = true;
        return res.status(200).json({ success: success, blog: blog, "Success!": "Blogs Fetched Sucessfully!" });
    } catch (error) {
        return res.status(200).json({ success: success, "Internal Server Error!": error.message });
    }
}

module.exports = getBlog;