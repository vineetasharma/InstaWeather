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
    console.log(req.user, 'user profile');
    var user = req.checkLoggedIn();
    console.log(user,'user');
    if(user){
        console.log('if part');
        User.findOne({_id: user._id}, function (err, data) {
            if (err) {
                res.render('index', {user: null, picURL:null});
            }
            else if (data) {
                console.log(data,'data chggv vjhjh');
                res.render('index', {user: data.username, picURL:data.profilePicUrl});

            }
        });

    }
    else{
        console.log(req.user);
        res.render('index', {user: (user ? user.name : (req.user ? req.user.username : null)), picURL: (user ? user.profilePicUrl : (req.user ? req.user.profilePicUrl : null))});
        console.log('else part of request');


    }

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
