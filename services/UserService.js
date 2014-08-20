//Import Enums
var EventName = require("../src/enum/EventName");

exports.findTwitterAccountService = function (profile) {
    var emitter = this;
    User.findOne({twitterId: profile.id}, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else if (!data) {
            var newData = {
                twitterId: profile.id,
                username: profile.displayName,
                photos: [
                    { value: profile.photos[0].value}
                ]
            };
            emitter.emit(EventName.DONE, newData);
        }
        else if (data) {
            emitter.emit(EventName.DONE, data);
        }
    })
}.toEmitter();

exports.addEmailAndCreateTwitterAcc = function (email, profile) {
    var emitter = this;
    if (!profile)
        emitter.emit(EventName.NOT_FOUND, null);
    else
        User.findOne({email: email}, function (err, data) {
            if (err) {
                emitter.emit(EventName.ERROR, err);
            } else if (!data) {
                new User({
                    username: profile.username,
                    twitterId: profile.twitterId,
                    email: email,
                    profilePicUrl: profile.photos[0].value
                }).save(function (err, user) {
                        if (err) {
                            log.error(err);
                            emitter.emit(EventName.ERROR, err);
                        }
                        else {
                        log.info('user is created',user);
                            emitter.emit(EventName.DONE, user);
                        }
                    });
            }
            if (data) {
                log.info("Welcome", data.username);
                if (!data.twitterId) {
                    User.update({email: email}, {twitterId: profile.twitterId}, function (err, result) {
                        if (err) {
                            emitter.emit(EventName.ERROR, err);
                        } else {
                            data.twitterId = profile.twitterId;
                            emitter.emit(EventName.DONE, data);
                        }
                    });
                } else
                    emitter.emit(EventName.DONE, data);
            }
        })
    }
    .
    toEmitter();

    exports.findOrCreateFacebookAccountService = function (accessToken, profile) {
        var emitter = this;
        User.findOne({email: profile.emails[0].value}, function (err, data) {
            if (err) {
                emitter.emit(EventName.ERROR, err);
            }
            else if (!data) {
                new User({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    fbId: profile.id
                }).save(function (err, user) {
                        if (err) {
                            log.error(err);
                            emitter.emit(EventName.ERROR, err);
                        }
                        else {
                            log.info('user is created');
                            emitter.emit(EventName.DONE, user)
                        }
                    });
            }
            else if (data) {
                log.info("Welcome", data.username);
                if (!data.fbId) {
                    User.update({email: profile.emails[0].value}, {fbId: profile.id}, function (err, result) {
                        if (err) {
                            emitter.emit(EventName.ERROR, err);
                        } else {
                            data.fbId = profile.id;
                            emitter.emit(EventName.DONE, data);
                        }
                    });
                } else
                    emitter.emit(EventName.DONE, data);
            }
        })
    }.toEmitter();


    exports.addLastSearchedLocation = function (userId, lastSearchedLocation) {
        var emitter = this;
        var location = {
            geoNameId: lastSearchedLocation.geoNameId,
            locationName: lastSearchedLocation.locationName,
            fullName: lastSearchedLocation.fullName,
            latitude: lastSearchedLocation.latitude,
            longitude: lastSearchedLocation.longitude
        };
        User.update({_id: userId}, {$set: {lastSearchedLocation: location}}, function (err, data) {
            if (err) {
                log.info("Error in update lastSearchedLocation");
                emitter.emit(EventName.ERROR, err);
            }
            else {
                log.info("sucessfull update lastSearchedLocation: ", data);
                emitter.emit(EventName.DONE, data);
            }
        })
    }.toEmitter();


