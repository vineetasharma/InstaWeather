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
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.index = function (req, res) {
    if (req.user) {
        res.loginUser(req.user._id, req.user.username, ['user']);
    }
    var user = req.checkLoggedIn();
    if(user){
        User.findOne({_id: user._id}, function (err, data) {
            if (err) {
                res.render('index', {user: null});
            }
            else if (data) {
                res.render('index', {user: data});
            }
            else{
                res.render('index', {user: null});
            }
        });
    }
    else{
        res.render('index', {user: (user ? user : (req.user ? req.user : null))});
    }

};

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

