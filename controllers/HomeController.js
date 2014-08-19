/**
 * Home Controller
 *
 * Handles the routes responsible for public facing pages (non-logged in pages)
 *
 * */

/**
 * Handles the route which renders the home page
 * @url "/"
 * */


"use strict";

exports.index = function (req, res) {
  if (req.user) {
    res.loginUser(req.user._id, req.user.username, ['user']);
  }
    console.log(req.user,'user profile');
    console.log(user,'user');
  var user = req.checkLoggedIn();
  res.render('index', {user: (user ? user.name : (req.user ? req.user.username : null)),picURL:(user?user.profilePicUrl:(req.user ? req.user.profilePicUrl : null))});
};

var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.sendMail = function (req, res) {
  HomeService.sendMailService(req.body)
    .on(EventName.ERROR, function (err) {
      log.error(err);
      res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
    })
    .on(EventName.DONE, function (data) {
      log.info(data, 'in contact controller');
      res.sendSuccessAPIResponse(data, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
    });
};
