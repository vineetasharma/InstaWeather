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
    HomeService.getUserSessionDetails(req,res)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.render('index', {user: {name:null,picURL:null}});
        })
        .on(EventName.NOT_FOUND, function (user) {
           log.info(user,'user');
            res.render('index', {user: {name:(user ? user.username : null), picURL: (user ? user.profilePicUrl:null)}});

        })
        .on(EventName.DONE, function (data) {
            res.render('index', {user: {name:data.username, picURL:data.profilePicUrl}});
        });
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
            res.sendSuccessAPIResponse(data, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
        });
};
