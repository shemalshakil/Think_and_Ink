const User = require("../../models/User.js");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "myblosgite";

const getUser = async (req, res) => {
    var success = false;
    try {
        const token = req.header("token");
        const data = JWT.verify(token, JWT_SECRET);
        if (data) {
            const user = await User.findById(data.id).select("-password");
            if(user){
                success = true;
                return res.status(200).json({ success: success, user: user });
            }else {
                return res.status(200).send({ success: success, "Error!": "User Not Authenticated!" });
            }
        } else {
            return res.status(200).send({ success: success, "Error!": "User Not Authenticated!" });
        }
    } catch (error) {
        return res.status(200).json({ success: success, "Internal Server Error!": error.message });
    }
}

module.exports = getUser;