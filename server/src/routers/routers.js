//Boilerplate imports------------------------------
const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const pollController = require('../controllers/pollController');

//post request to handle logins -> tested and works
router.post('/login', authenticationController.login, (req, res) => {
  return res.status(200).send('This is the working login button');
});

//post request to handle logins -> tested and works
router.post('/register', authenticationController.register, (req, res) => {
  return res.status(200).send('This is the working register submit button');
});

//post request to handle the database vote now button on the dashboard page
router.post(
  '/dashboard/votenow',
  pollController.dashboardVoteNow,
  (req, res) => {
    return res.status(200).send('This is the working database vote now button');
  }
);

//post request to handle the create poll button
router.post('/create-poll', pollController.createPoll, (req, res) => {
  return res.status(200).send(res.locals.code);
});

router.post('/createdpoll/votenow', (req, res) => {
  return res.status(200).send('This is the create poll page');
});

router.get('/pastpolls', pollController.pastPolls, (req, res) => {
  return res.status(200).send(res.locals.polls);
});

//Export the router---------------------------
module.exports = router;
