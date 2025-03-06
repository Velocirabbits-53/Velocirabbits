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
exports.pollController = void 0;
const users_1 = require("../models/users");
const crypto_1 = __importDefault(require("crypto"));
const pollController = {};
exports.pollController = pollController;
// This is the controller for the dashboard vote now button
pollController.dashboardVoteNow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructure req.body to take the incoming code
        // console.log('The value of the incoming req.body.code is', req.body.code);
        const { code } = req.body;
        // console.log('The value of the code is', code);
        //assign a variable to the value of the code inside of the database
        const poll = yield users_1.Poll.findOne({ code: code });
        // console.log('The value of the poll is', poll);
        // check if the code exist inside of the database
        if (poll) {
            // if it exist inside of the database, return a 200 response
            next();
        }
        else {
            // otherwise throw an error
            return res
                .status(400)
                .json({ message: "code doesn't exist in database" });
        }
    }
    catch (err) {
        return next({
            log: 'You are receiving an error from the pollController.dashboardVoteNow',
            status: 500,
            message: { err: 'This is a 500 error message' },
        });
    }
});
pollController.createPoll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await Poll.deleteMany({});
        const { pollName, pollTopics, createdBy } = req.body;
        const generateUniqueCode = () => __awaiter(void 0, void 0, void 0, function* () {
            let code;
            let exists = true;
            while (exists) {
                code = crypto_1.default.randomBytes(3).toString('hex').toUpperCase();
                if (((yield users_1.Poll.findOne({ code })) !== null)) {
                    //TODO for rachel- is await in a function ok? Sometimes await gets mad if you try to do something too soon after setting a val equal to whatever comes back from the await function, so is this just fine? I'd think it wouldn't work but idk chatgpt said it's ok 
                    return exists = true;
                }
                else {
                    return exists = false;
                }
                // ^ THIS IS AN "UGLY" WAY OF WRITING exist = (await Poll.findOne({ code }) !== null)
            }
            return code;
        });
        const code = yield generateUniqueCode();
        const pollTopicsWithVotes = pollTopics.map((topic) => (Object.assign(Object.assign({}, topic), { votes: 0 })));
        const poll = yield users_1.Poll.create({
            pollName,
            pollTopics: pollTopicsWithVotes,
            code,
            createdBy,
        });
        // console.log('The value of poll is', poll);
        res.locals.code = code;
        next();
    }
    catch (err) {
        return next({
            log: 'You are receiving an error from the pollController.createPoll',
            status: 500,
            message: { err: 'This is a 500 error message' },
        });
    }
});
pollController.pastPolls = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const poll = yield users_1.Poll.find({ createdBy: username });
    // console.log('The value of the poll is', poll);
    res.locals.polls = poll;
    next();
});
pollController.votingPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        // console.log('The value of the code is ',code)
        const poll = yield users_1.Poll.findOne({ code });
        // console.log('The value of the poll is ', poll)
        if (!poll) {
            return res.status(400).json({ message: "Invalid Code" });
        }
        res.locals.poll = poll;
        next();
    }
    catch (err) {
        return next({
            log: 'You are receiving an error from the pollController.votingPage',
            status: 500,
            message: { err: 'This is a 500 error message' },
        });
    }
});
pollController.updatedVotes = (req, res, next) => {
    const { votes } = req.body;
    return users_1.Poll.findOne({ code: req.body.code })
        .then(updatedPoll => {
        if (updatedPoll !== null) {
            let pollTopics;
            if (Array.isArray(updatedPoll.pollTopics)) {
                pollTopics = updatedPoll.pollTopics;
            }
            else {
                return next();
            }
            updatedPoll.pollTopics = pollTopics.map((poll, index) => {
                return Object.assign(Object.assign({}, poll), { votes: Number(poll.votes) + votes[index] });
            });
            return users_1.Poll.findOneAndUpdate({ code: req.body.code }, updatedPoll.pollTopics)
                .then(() => next())
                .catch(err => next({
                log: 'Error updating poll topics in pollController.updatedVotes',
                status: 500,
                message: { err: 'This is a 500 error message' },
            }));
        }
        else {
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
pollController.getResults = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get the data from database
    // console.log(req.params.code)
    const code = req.params.code;
    const data = yield users_1.Poll.findOne({ code: code });
    // console.log('the value of data is', data)
    res.locals.data = data;
    next();
});
