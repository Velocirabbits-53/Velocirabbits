//Boilerplate imports------------------------------
const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController')

//post request to handle logins
router.post('/login', authenticationController.login,(req, res) => {
  return res.status(200).send('This is working');
});

//Export the router---------------------------
module.exports = router;
