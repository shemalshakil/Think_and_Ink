const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        require: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        data: Buffer,
        contentType: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Post;