"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//Boilerplate imports------------------------------
const express_1 = __importDefault(require("express"));
const authenticationController_1 = require("../controllers/authenticationController");
const pollController_1 = require("../controllers/pollController");
const router = express_1.default.Router();
exports.router = router;
//post request to handle logins -> tested and works
router.post('/login', authenticationController_1.authenticationController.login
// , (req: Request, res: Response) => {return res.status(200).send('This is the working login button')}
);
//post request to handle logins -> tested and works
router.post('/register', authenticationController_1.authenticationController.register
// , (req: Request, res: Response) => {return res.status(200).send('This is the working register submit button')}
);
//post request to handle the database vote now button on the dashboard page
router.post('/dashboard/votenow', pollController_1.pollController.dashboardVoteNow);
//post request to handle the create poll button
router.post('/create-poll', pollController_1.pollController.createPoll
// , (req: Request, res: Response) => {return res.status(200).send(res.locals.code)}
);
router.get('/pastpolls/:username', pollController_1.pollController.pastPolls
// , (req: Request, res: Response) => {return res.status(200).send(res.locals.polls)}
);
router.get('/voting-page/:code', pollController_1.pollController.votingPage
// , (req: Request, res: Response) => {return res.status(200).send(res.locals.poll)}
);
router.patch('/updated-votes', pollController_1.pollController.updatedVotes
// ,(req: Request, res: Response) => {return res.status(200).send('The votes have been updated')}
);
router.get('/results/:code', pollController_1.pollController.getResults
// , (req: Request, res: Response) => {return res.status(200).send(res.locals.data)}
);
