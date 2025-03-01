//Boilerplate imports------------------------------
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

//Import the router------------------------------
const router = require('./routers/routers');

//Boilerplate adjustment of data--------------------------------------
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Define the router handler------------------------------
app.use('/user',router)

//Boilerplate to check if the code is working correctly---------------------------
app.get('/', (req, res) => {
  res.status(200).json('Hello from the backend');
});
//Boilerplate to send a 404 error if page doesn't exit---------------------------
app.use((req, res) => {
  res.status(404).json('This is a 404 error');
});

//Boilerplate to send a 500 error if system error--------------------------------
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'You are receiving an error from the server',
    status: 500,
    message: { err: 'This is a 500 error message' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).send(errorObj.message);
});

//Boilerplate to send a console.log when the server starts--------------------------------
app.listen(PORT, () => {
  console.log(`Now listening on ${PORT}`);
});

module.exports = app;
