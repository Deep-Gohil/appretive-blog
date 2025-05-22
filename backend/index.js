const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectToDatabase = require("./config/db");
const userRouter = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");
const commentRouter = require("./routes/comment.routes");
const path = require("path")

const app = express();

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

// routes

app.get("/", (req, res) => {
    res.send("Default Route");
});

app.get("/api/images/:filename", (req, res) => {
    res.sendFile(path.join(__dirname, "uploads", req.params.filename));
});

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port", PORT);
    connectToDatabase();
});