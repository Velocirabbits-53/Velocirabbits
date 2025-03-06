//Boilerplate imports------------------------------
import { router } from '../routers/routers';
import {Request, Response, NextFunction, Express} from "express";
import { Poll } from '../models/users';
import crypto from 'crypto';
import { PollPoll, PollParam, PollController, PollReq, PollRes } from "../types";
import { Document, Types } from 'mongoose';

type PollArray = Types.DocumentArray<PollPoll>;
const pollController: PollController = {};

// This is the controller for the dashboard vote now button
pollController.dashboardVoteNow = async (req, res, next) => {
  try {
    // destructure req.body to take the incoming code
    // console.log('The value of the incoming req.body.code is', req.body.code);
    const { code } = req.body;
    // console.log('The value of the code is', code);
    //assign a variable to the value of the code inside of the database
    const poll = await Poll.findOne({ code: code });
    // console.log('The value of the poll is', poll);
    // check if the code exist inside of the database
    if (poll) {
      // if it exist inside of the database, return a 200 response
      next();
    } else {
      // otherwise throw an error
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
    // await Poll.deleteMany({});
    const { pollName, pollTopics, createdBy } = req.body;
    const generateUniqueCode = async () => {
      let code;
      let exists = true;
      //To ensure that each poll has a unique code. 
      while (exists) {
        code = crypto.randomBytes(3).toString('hex').toUpperCase();
        //Checks if a poll with the generated code already exists in the database. If a poll with the code is found, exists is set to true, otherwise to false.
        exists = await Poll.findOne({code}) !==null;
      }
      return code;
    };
    //     if ((await Poll.findOne({ code }) !== null )) {
    //       //TODO for rachel- is await in a function ok? Sometimes await gets mad if you try to do something too soon after setting a val equal to whatever comes back from the await function, so is this just fine? I'd think it wouldn't work but idk chatgpt said it's ok 
    //       return exists = true
    //     } else { 
    //       return exists = false
    //     }
    //     // ^ THIS IS AN "UGLY" WAY OF WRITING exist = (await Poll.findOne({ code }) !== null)
    //   }
    //   return code;
    // };
    const code = await generateUniqueCode();
    const pollTopicsWithVotes = pollTopics.map((topic: {}) => ({ // topic is an object?
      // ? why were the "topic"s defined as objects?? it's kinda fine but why- we had to define topic as an object inline because of it
      ...topic, // TODO we want to extract the topic value from the topic object?
      votes: 0,
    }));
    const poll = await Poll.create({
      pollName,
      pollTopics: pollTopicsWithVotes,
      code,
      createdBy,
    });
    // console.log('The value of poll is', poll);
    res.locals.code = code;
    next();
  } catch (err) {
    return next({
      log: 'You are receiving an error from the pollController.createPoll',
      status: 500,
      message: { err: 'This is a 500 error message' },
    });
  }
};

pollController.pastPolls = async (req, res, next) => {
  const { username } = req.params as PollParam;
  const poll = await Poll.find({ createdBy: username });
  // console.log('The value of the poll is', poll);
  res.locals.polls = poll;
  next();
};

pollController.votingPage = async (req, res, next) => {
  try {
    const { code } = req.params;
    // console.log('The value of the code is ',code)
    const poll = await Poll.findOne({ code });
    // console.log('The value of the poll is ', poll)
    if (!poll){
      return res.status(400).json({ message: "Invalid Code" });
    }
    res.locals.poll = poll;
    next();
  } catch (err) {
    return next({
      log: 'You are receiving an error from the pollController.votingPage',
      status: 500,
      message: { err: 'This is a 500 error message' },
    });
  }
};

pollController.updatedVotes = (req, res, next) => {
  const { votes } = req.body as PollReq;

  return Poll.findOne({ code: req.body.code })
    .then(updatedPoll => {
      if (updatedPoll !== null) {
        let pollTopics;
        if (Array.isArray(updatedPoll.pollTopics)) {
          pollTopics = updatedPoll.pollTopics;
        } else {
          return next();
        }

        updatedPoll.pollTopics  = pollTopics.map((poll, index: number) => {
          return {
            ...poll,
            votes: Number(poll.votes) + votes[index],
          };
        }) as PollArray;

        return Poll.findOneAndUpdate({ code: req.body.code }, updatedPoll.pollTopics)
          .then(() => next())
          .catch(err => next({
            log: 'Error updating poll topics in pollController.updatedVotes',
            status: 500,
            message: { err: 'This is a 500 error message' },
          }));
      } else {
        return next();
      }
    })
    .catch(err => next({
      log: 'Error finding poll in pollController.updatedVotes',
      status: 500,
      message: { err: 'This is a 500 error message' },
    }));
};


// pollController.updatedVotes = async (req, res, next) => {
//   // console.log('The value of req.body is',req.body)
//   const { votes } = req.body as PollReq;
//   // console.log('The value of incoming votes is',votes)
//   const updatedPoll = await Poll.findOne({ code: req.body.code });
//   // console.log('The value of the updated poll is',updatedPoll.pollTopics)

//   if(updatedPoll !== null) {
//     // const pollTopics = Array.isArray(updatedPoll.pollTopics) ? updatedPoll.pollTopics || []
//     // ^ this means that updatedPoll will fall back onto an empty array if it finds that updatedPoll is null or nonexistent 
//     let pollTopics;
//     if(Array.isArray(updatedPoll.pollTopics)){
//       pollTopics = updatedPoll.pollTopics;
//     } else {
//       return next()
//     }
//     // console.log('The value of the updated poll is', pollTopics)
    
//     updatedPoll.pollTopics = pollTopics.map((poll: PollPoll, index: number) => {
//       // console.log('The value of poll.votes is',poll.votes)
//       // console.log('The value of votes[index]is', votes[index])
//       return {
//         ...poll,
//         votes = Number(poll.votes) + votes[index],
//       } 
//     });

//     // console.log('The value of updatedPollTopics is', updatedPoll);
//     await Poll.findOneAndUpdate({ code: req.body.code }, updatedPoll.pollTopics);
//   }
// };

pollController.getResults = async (req, res, next) => {
  //get the data from database
  // console.log(req.params.code)
  const code = req.params.code;
  const data = await Poll.findOne({ code: code });
  // console.log('the value of data is', data)
  res.locals.data = data;
  next();
};

export { pollController }