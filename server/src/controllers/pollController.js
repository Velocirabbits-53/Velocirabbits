//Boilerplate imports------------------------------
const router = require('../routers/routers');
const express = require('express');
const { Poll } = require('../models/users');
const crypto = require('crypto');

const pollController = {};

//This is the controller for the dashboard vote now button
pollController.dashboardVoteNow = async (req, res, next) => {
  try {
    //destructure req.body to take the incoming code
    console.log('The value of the incoming req.body.code is', req.body.code);
    const { code } = req.body;
    console.log('The value of the code is', code);
    //assign a variable to the value of the code inside of the database
    const poll = await Poll.findOne({ code: code });
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

pollController.createPoll = async (req, res, next) => {
  try {
    await Poll.deleteMany({})
    const { pollName, pollTopics } = req.body;
    const generateUniqueCode = async () => {
      let code;
      let exists = true;
      while (exists) {
        code = crypto.randomBytes(3).toString('hex').toUpperCase();
        exists = await Poll.findOne({ code });
      }
      return code;
    };
    const code = await generateUniqueCode();
    const pollTopicsWithVotes = pollTopics.map(topic => ({
      ...topic,
      votes: 0
    }))
    const poll = await Poll.create({ pollName, pollTopics:pollTopicsWithVotes , code });
    // console.log('The value of poll is', poll);
    res.locals.code = code
    next();
  } catch (err) {
    return next({
      log: 'You are receiving an error from the pollController.createPoll',
      status: 500,
      message: { err: 'This is a 500 error message' },
    });
  }
};


pollController.createdPollNoteNow = (req, res, next) => {
  next();
};

pollController.pastPolls = async (req, res, next) => {
  const poll = await Poll.find();
    // console.log('The value of the poll is', poll);
    res.locals.polls = poll
  next();
};



module.exports = pollController;
