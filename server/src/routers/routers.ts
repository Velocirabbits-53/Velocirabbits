//Boilerplate imports------------------------------
import { Request, Response } from "express";
import { authenticationController } from '../controllers/authenticationController';
import { pollController } from '../controllers/pollController';
const router = express.Router();

//post request to handle logins -> tested and works
router.post('/login', authenticationController.login, (req: Request, res: Response) => {
  return res.status(200).send('This is the working login button');
});

//post request to handle logins -> tested and works
router.post('/register', authenticationController.register, (req: Request, res: Response) => {
  return res.status(200).send('This is the working register submit button');
});

//post request to handle the database vote now button on the dashboard page
router.post(
  '/dashboard/votenow',
  pollController.dashboardVoteNow,
  (req: Request, res: Response) => {
    return res.status(200).send('This is the working database vote now button');
  }
);

//post request to handle the create poll button
router.post('/create-poll', pollController.createPoll, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.code);
});

router.get('/pastpolls:username', pollController.pastPolls, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.polls);
});

router.get('/voting-page:code', pollController.votingPage, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.poll);
});

router.patch('/updated-votes',pollController.updatedVotes,(req: Request, res: Response) => {
  return res.status(200).send('The votes have been updated');
})

router.get('/results:code', pollController.getResults, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.data);
})

//Export the router---------------------------
export { router }