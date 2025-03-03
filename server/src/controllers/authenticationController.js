const router = require("../routers/routers");
const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticationController = {};

authenticationController.login = async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const user = User.findOne({ username });
    if (!username) {
      return res.status(400).json({ message: "incorrect username" });
    }
    // if (password !== user.password) {
    //   return res.status(400).json({ message: "incorrect password" });
    // }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "0.25h",
    });
    res.statatus(200).json({ message: "loged in ", token });

    return next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
};

authenticationController.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "Thank you" });
    return next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
};

module.exports = authenticationController;
