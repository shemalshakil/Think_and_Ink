const User = require("../../models/User.js");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const JWT_SECRET = "myblosgite";

const signup = async (req, res) => {
    var success = true;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success = false;
        return res.status(200).json({  success: success, message: errors.array()[0].msg });
    }
    try {
        var user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(200).json({ success: success, message: "This Email Already Exist!" });
        }
        if (!req.file) {
            success = false;
            return res.status(200).json({ success: success, message: "No Profile Image Uploaded!" });
        }
        if(req.body.password!==req.body.repeat){
            success = false;
            return res.status(200).json({  success: success, message: "Password and Repeated Password Don't Match!" });
        }
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            profileImage: {
                data: fs.readFileSync(path.join(__dirname + '/../../images/' + req.file.filename)),
                contentType: req.file.mimetype,
            },
            password: securedPassword
        });
        const authToken = JWT.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET);
        user = await User.findById(user.id).select("-password");
        fs.rm(path.join(__dirname + '/../../images/' + req.file.filename) ,(err)=>{console.log(err)});
        return res.status(200).json({ success: success, authToken: authToken, user: user, message: "Account Successfully Created!" });
    } catch (error) {
        fs.rm(path.join(__dirname + '/../../images/' + req.file.filename) ,(err)=>{console.log(err)});
        return res.status(200).json({ success: success, message:"Internal Server Error!"});
    }
}

module.exports = signup;