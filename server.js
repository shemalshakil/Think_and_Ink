const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const app = express();

const auth = require("./routes/auth.js");
const blog = require("./routes/blog.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/api/auth", auth);
app.use("/api/blog", blog);

app.listen(5000, (req, res) => {
    mongoose.connect("mongoURI", () => {
        console.log("Connected to Mongo!");
    })
    console.log("App is listening on http://localhost:5000");
});
