"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");
/*
* */
exports.save = function (reqData) {
    var emitter = this;
    Location.findOne({geoNameId:reqData.geonames[0].geonameId}, function (err, location) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else if (!location) {
            new Location({
                geoNameId:reqData.geonames[0].geonameId,
                locationName:reqData.geonames[0].name,
                fullName:(reqData.geonames[0].name+', '+reqData.geonames[0].adminName1+', '+reqData.geonames[0].countryName),
                latitude:reqData.geonames[0].lat,
                longitude:reqData.geonames[0].lng,
                searchCount: 1
            }).save(function (err, location) {
                    if (err) {
                        log.error(err);
                        emitter.emit(EventName.ERROR, err);
                    }
                    else {
                        log.info('Location information saved');
                        emitter.emit(EventName.DONE, location)
                    }
                });
        }
        else if (location) {
            log.info("Location already exists", location.locationName);
            Location.update({geoNameId:location.geoNameId},{$inc:{searchCount:1}},function(err) {
                if (err) {
                    log.error(err);
                    emitter.emit(EventName.ERROR, err);
                }
                else {
                    log.info('Location searchCount incrementerd');
                    emitter.emit(EventName.DONE, location);
                }
            });
        }
    })
}.toEmitter();