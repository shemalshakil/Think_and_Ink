const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/")
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4()+"-" + file.fieldname + "-" + file.originalname.toLowerCase().split(" ").join("-"))
    }
});
  
const imageUpload = multer({ storage: storage });

module.exports = imageUpload;