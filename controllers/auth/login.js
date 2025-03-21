const User = require("../../models/User.js");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "myblosgite";

const login = async (req, res) => {
    var success = false;
    try {
        var user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ success: success, message: "User Not Found!" });
        }
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return res.status(200).json({ success: success, message: "Incorrect Password!" });
        }
        const authToken = JWT.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET);
        user = await User.findById(user.id).select("-password");
        success = true;
        return res.status(200).json({ success: success, authToken: authToken, user: user, message: "Account Successfully LoggedIn!" });
    } catch (error) {
        return res.status(200).json({ success: success, message:"Internal Server Error!"});
    }
}

module.exports = login;