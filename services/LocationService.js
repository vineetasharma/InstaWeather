"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");
/*
 * */
exports.saveSearchPlaceDetails = function (reqData) {
    var emitter = this;
    Location.findOne({geoNameId: reqData.geoNameId}, function (err, location) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else if (!location) {
            new Location({
                geoNameId: reqData.geoNameId,
                locationName: reqData.locationName,
                fullName: reqData.locationName,
                latitude: reqData.latitude,
                longitude: reqData.longitude,
                searchCount: 1
            }).save(function (err, location) {
                    if (err) {
                        log.error(err);
                        emitter.emit(EventName.ERROR, err);
                    }
                    else {
                        emitter.emit(EventName.DONE, location)
                    }
                });
        }
        else if (location) {
            Location.update({geoNameId: location.geoNameId}, {$inc: {searchCount: 1}}, function (err) {
                if (err) {
                    log.error(err);
                    emitter.emit(EventName.ERROR, err);
                }
                else {
                    emitter.emit(EventName.DONE, location);
                }
            });
        }
    })
}.toEmitter();


exports.getMostSearchPlaceDetails = function () {
    var emitter = this;
    Location.find().exec(function (err, result) {
        if (err) {
            log.info("Locations find error: ", err.message);
            emitter.emit(EventName.ERROR, err);
        }
        else {
            emitter.emit(EventName.DONE, result);
        }
    });
}.toEmitter();


exports.getLastSearchLocation = function (userId) {
    var emitter = this;
    User.findOne({_id:userId}).exec(function (err, user) {
        if (err) {
            log.info("Locations find error: ", err.message);
            emitter.emit(EventName.ERROR, err);
        }
        else {
            emitter.emit(EventName.DONE, user.lastSearchedLocation);
        }
    });
}.toEmitter();