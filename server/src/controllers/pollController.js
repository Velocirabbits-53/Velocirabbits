//Boilerplate imports------------------------------
const router = require('../routers/routers');
const express = require('express');
const Candidate = require('../models/users');

const pollController = {};

//This is the controller for the dashboard vote now button
pollController.dashboardVoteNow = async (req, res, next) => {
  try {
    //destructure req.body to take the incoming code
    console.log('The value of the incoming req.body.code is', req.body.code);
    const { code } = req.body;
    console.log('The value of the code is', code);
    //assign a variable to the value of the code inside of the database
    const poll = await User.findOne({ code: code });
    console.log('The value of the poll is', poll);
    //check if the code exist inside of the database
    if (poll) {
      //if it exist inside of the database, return a 200 response
      next();
    } else {
      //otherwise throw an error
      return res
        .status(400)
        .json({ message: "code doesn't exist in database" });
    }
  } catch (err) {
    return next({
      log: 'You are receiving an error from the pollController.dashboardVoteNow',
      status: 500,
      message: { err: 'This is a 500 error message' },
    });
  }
};

pollController.createPoll = (req, res, next) => {
  next();
};

pollController.createdpollvotenow = (req, res, next) => {
  next();
};

module.exports = pollController;
