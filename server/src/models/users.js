"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = exports.User = void 0;
//this is needed to read the .env file
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
//let password = Qw0PGEwC2Ip6wAHk
const mongoURI = process.env.MONGO_URITWO;
if (mongoURI) {
    mongoose_1.default.connect(mongoURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
}
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const pollSchema = new mongoose_1.default.Schema({
    pollName: { type: String },
    pollTopics: [{ pollTopic: { type: String }, votes: { type: Number } }],
    code: { type: String },
    createdBy: { type: String },
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const Poll = mongoose_1.default.model("Poll", pollSchema);
exports.Poll = Poll;
// import express from "express";
// import mongoose from "mongoose";
// import path from "path";
// import User from "../models/User";
// const app = express();
// const port = 3000;
// mongoose.connect("mongodb link", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("client"));
// app.get("/home", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/home.html"));
// });
// app.post("./register", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existUser = await User.findOne({ email });
//     if (existUser) {
//       return res.send("this email already registered");
//     }
//     const newUser = new User({
//       email,
//       password,
//     });
//     await newUser.save();
//     res.redirect("/login");
//   } catch (err) {
//     console.log(err);
//     res.send("error");
//   }
// });
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/login.html"));
// });
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.send("user not found");
//     }
//     if (password === user.password) {
//       res.redirect("/home");
//     } else {
//       res.send("incorrect password.");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send("error");
//   }
// });
// app.get("/home", (req, res) => {
//   res.send("Home Page");
// });
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
