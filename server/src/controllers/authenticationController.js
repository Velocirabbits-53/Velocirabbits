//Boilerplate imports------------------------------
const router = require('../routers/routers');
const express = require('express');

//This will handle login/register request
const authenticationController = {};

authenticationController.login = (req, res, next) => {

  next();
};

authenticationController.register = (req, res, next) => {

    next();
  };




module.exports = authenticationController;
