"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.saveSearchPlaceDetails=function(req, res){
    //Check for Errors
    var errors = req.validationErrors();

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
                res.sendSuccessAPIResponse({
                    geoNameId:location.geonameId,
                    locationName:location.locationName,
                    fullName:location.fullName,
                    latitude:location.latitude,
                    longitude:location.longitude,
                    searchCount:location.searchCount
                }, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
            });
    }
};

exports.getMostSearchPlaceDetails=function(req, res){
    //Check for Errors
    console.log('find called in location controller');

    var errors = req.validationErrors();

    if (Boolean(errors)) {
        res.sendErrorAPIResponse(errors, HttpStatusCode.VALIDATION_ERROR);
    } else {
        console.log('find called');
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