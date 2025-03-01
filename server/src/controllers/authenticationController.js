const router = require("../routers/routers");
const express = require("express");
const User = require("../models/users");

const authenticationController = {};

authenticationController.login = async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const user = User.findOne({ username });
    if (!username) {
      return res.status(400).json({ message: "incorrect username" });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "incorrect password" });
    }

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
    const newUser = new User({
      username,
      password,
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
