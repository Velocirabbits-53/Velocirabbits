"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationController = void 0;
// import { router } from "../routers/routers";
// import {Express, NextFunction} from "express";
const users_1 = require("../models/users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationController = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("🔐 Login controller reached!");
        const { password, username } = req.body;
        users_1.User.findOne({ username })
            .then((user) => {
            if (!user) {
                console.log('🤔 User.findOne has exited early!');
                throw {
                    log: 'Incorrect username in authenticationController',
                    status: 400,
                    message: { error: 'Incorrect Username.' },
                };
            }
            return bcryptjs_1.default.compare(password, user.password).then((matched) => ({ user, matched }));
        })
            .then(({ user, matched }) => {
            if (!matched) {
                console.log(`🛂 bcrypt.compare gave us something we didn't like.`);
                throw {
                    log: "Incorrect password in authenticationController",
                    status: 400,
                    message: { error: "Incorrect Password" }
                };
            }
            if (!process.env.JWT_SECRET) {
                console.log('💀 JWT secret seems to be missing!');
                throw {
                    log: "JWT secret is not defined",
                    status: 400,
                    message: { error: "Internal Server Error" }
                };
            }
            const payload = { userId: user._id };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "0.25hr" });
            return res.status(200).json({ message: "logged in", token });
            // return next()
        })
            .catch((error) => {
            return next(error);
        });
    }),
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('🛂 Registration controller reached!');
        const { username, password } = req.body;
        console.log("The value of the req.body.username is ", req.body.username);
        console.log("The value of the req.body.password is ", req.body.password);
        users_1.User.findOne({ username: username })
            .then((userExists) => {
            if (userExists) {
                throw {
                    log: 'Already existing username in authenticationController',
                    status: 400,
                    message: { error: 'User already exists' },
                };
            }
            return bcryptjs_1.default.genSalt(6);
        })
            .then((salt) => {
            return bcryptjs_1.default.hash(password, salt);
        })
            .then((hashedPassword) => {
            const newUser = new users_1.User({
                username: username,
                password: hashedPassword,
            });
            return newUser.save();
        })
            .then(() => {
            // return is allowed here cuz we're done yay
            return res.status(200).json({ message: "Thank you" });
        })
            .catch((error) => {
            return next(error);
        });
    })
};
exports.authenticationController = authenticationController;
// try {
//   const { username, password } = req.body;
//   console.log("The value of the req.body.username is", req.body.username);
//   console.log("The value of the req.body.password is", req.body.password);
//   const userExists = await User.findOne({ username: username });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }
//   console.log("we are here");
//   const salt = await bcrypt.genSalt(6);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   const newUser = new User({
//     username: username,
//     password: hashedPassword,
//   });
//   console.log(newUser);
//   await newUser.save();
//   res.status(200).json({ message: "Thank you" });
//   return next();
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ message: "error" });
// }
//   try {
//     console.log("we have reached the login controller");
//     const { password, username } = req.body;
//     if (!username) {
//       return res.status(400).json({ message: "incorrect username" });
//     }
//     const user = await User.findOne({ username: username });
//     if (user) {
//       const matched = await bcrypt.compare(password, user.password);
//     }
//     if (!matched) {
//       return res.status(400).json({ message: "incorrect password" }); 
//     }
//     const payload = { userId: user._id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "0.25hr",
//     });
//     res.status(200).json({ message: "logged in", token });
//     return next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "error" });
//   }
// },
// authenticationController.login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log("we have reached the login controller");
//     const { password, username } = req.body;
//     const user = await User.findOne({ username: username });
//     if (!username) {
//       return res.status(400).json({ message: "incorrect username" });
//     }
//     // if (password !== user.password) {
//     //   return res.status(400).json({ message: "incorrect password" });
//     // }
//     const matched = await bcrypt.compare(password, user.password);
//     if (!matched) {
//       return res.status(400).json({ message: "incorrect password" });
//     }
//     const payload = { userId: user._id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "0.25hr",
//     });
//     res.status(200).json({ message: "logged in ", token });
//     return next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "error" });
//   }
// };
// authenticationController.register = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { username, password } = req.body;
//     console.log("The value of the req.body.username is", req.body.username);
//     console.log("The value of the req.body.password is", req.body.password);
//     const userExists = await User.findOne({ username: username });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     console.log("we are here");
//     const salt = await bcrypt.genSalt(6);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = new User({
//       username: username,
//       password: hashedPassword,
//     });
//     console.log(newUser);
//     await newUser.save();
//     res.status(200).json({ message: "Thank you" });
//     return next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "error" });
//   }
// };
