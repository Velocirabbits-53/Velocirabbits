//Boilerplate imports------------------------------
const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController')
const pollController = require ('../controllers/pollController')

//post request to handle logins
router.post('/login', authenticationController.login,(req, res) => {
  return res.status(200).send('This is the working login button');
});

//post request to handle logins
router.post('/register', authenticationController.register,(req, res) => {
    return res.status(200).send('This is the working register submit button');
  });

//post request to handle the database vote now button
router.post('/dashboard/votenow', pollController.dashboardVoteNow,(req,res) =>{
    return res.status(200).send('This is the working database vote now button');
})
router.post('/createPoll', pollController.createPoll, (req, res) => {
  return res.status(200).send('This is the create poll page');
});



//Export the router---------------------------
module.exports = router;
