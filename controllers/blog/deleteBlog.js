const Blog = require("../../models/Blog.js");

const deleteBlog = async (req, res) => {
    var success = false;
    try {
        var blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(200).json({ success: success, message: "The Specified Post Doesn't Exist!" });
        }
        if (blog.user.toString() !== req.user.id) {
            return res.status(200).json({ success: success, message: "Only Post Author can Delete their Posts!" });
        }
        blog = await Blog.findByIdAndDelete(req.params.id);
        success = true;
        return res.status(200).json({ success: success, blog: blog, message: "Post Sucessfully Deleted!" });
    } catch (error) {
        return res.status(200).json({ success: success, message:"Internal Server Error!"});
    }
}

module.exports = deleteBlog;