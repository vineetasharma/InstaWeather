"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.saveSearchPlaceDetails = function (req, res) {
    //Check for Errors
    var errors = req.validationErrors();
    var user = req.checkLoggedIn();
    if (Boolean(errors)) {
        res.sendErrorAPIResponse(errors, HttpStatusCode.VALIDATION_ERROR);  //Validation Failed
    } else {
        //Go Ahead With Listing
        LocationService.saveSearchPlaceDetails(req.body)
            .on(EventName.ERROR, function (err) {
                log.error(err);
                res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
            })
            .on(EventName.DONE, function (location) {
                if (user) {
                    log.info("you are loggedin");
                    UserService.addLastSearchedLocation(user._id, location)
                        .on(EventName.ERROR, function (err) {
                            log.info("Error during Recent search location updation",err);
                        })
                        .on(EventName.DONE, function (result) {
                            log.info("Recent search location updated",result);
                        });
                }
                else{
                    log.info("you are not loggedin");
                }
                    res.sendSuccessAPIResponse(location, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
            });
    }
};

exports.getMostSearchPlaceDetails = function (req, res) {
    //Check for Errors
    var errors = req.validationErrors();
    if (Boolean(errors)) {
        res.sendErrorAPIResponse(errors, HttpStatusCode.VALIDATION_ERROR);
    } else {
        LocationService.getMostSearchPlaceDetails()
            .on(EventName.ERROR, function (err) {
                log.error(err);
                res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
            })
            .on(EventName.DONE, function (data) {
                res.sendSuccessAPIResponse(data, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
            });
    }
};


exports.getLastSearchLocation = function (req, res) {
    //Check for Errors
    var user = req.checkLoggedIn();
    var errors = req.validationErrors();
    if (Boolean(errors)) {
        res.sendErrorAPIResponse(errors, HttpStatusCode.VALIDATION_ERROR);
    } else {
        if (user) {
            LocationService.getLastSearchLocation(user._id)
                .on(EventName.ERROR, function (err) {
                    log.error(err);
                    res.sendErrorAPIResponse(err, HttpStatusCode.SERVER_ERROR);
                })
                .on(EventName.DONE, function (location) {
                    res.sendSuccessAPIResponse(location, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
                });
        }
        else{
            res.sendSuccessAPIResponse(null, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
        }
    }
};