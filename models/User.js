const mongoose = require("mongoose");

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        require: true
    },
    profileImage: {
        data: Buffer,
        contentType: String,
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = User;