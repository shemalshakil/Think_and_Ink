const JWT = require("jsonwebtoken");
const JWT_SECRET = "myblosgite";

const fetchUser = (req, res, next) => {
    var success = false;
    try {
        const token = req.header("token");
        if(!token){
            return res.status(200).json({ success: success, "Error!":"No Authentication Token Was Provided!"});
        }
        const data = JWT.verify(token, JWT_SECRET);
        if(data){
            success = true;
            req.user = data;
            next();
        }else{
            return res.status(200).send({ success: success, "Error!":"User Not Authenticated!"});
        }
    } catch (error) {
        return res.status(200).json({ success: success, "Internal Server Error!": error.message });
    }
}

module.exports = fetchUser;