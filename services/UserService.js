var EventName = require("../src/enum/EventName");

exports.findOrCreateTwitterAccountService = function (profile) {
    var emitter = this;
    User.findOne({twitterId: profile.id}, function (err, data) {
        if (err) {
            emitter.emit("error", err);
        } else if (!data) {
            new User({
                username: profile.displayName,
                twitterId: profile.id,
                profilePicUrl: profile.photos[0].value,
                About: "",
                profileData: {
                    Birthday: "",
                    Gender: "",
                    Mobile: "",
                    CurrentCity: ""
                },
                Address: {
                    Hometown: "",
                    City: "",
                    State: "",
                    Country: "",
                    pin: ""
                }
            }).save(function (err, user) {
                    if (err) {
                        log.error(err);
                        emitter.emit('error', err);
                    }
                    else {
                        emitter.emit('success', user);
                    }
                });
        }
        if (data) {
            emitter.emit('success', data);
        }
    })
}.toEmitter();

exports.findOrCreateFacebookAccountService = function (accessToken, profile) {
    var emitter = this;
    console.log(profile, 'FB profile');
    User.findOne({email: profile.emails[0].value}, function (err, data) {
        if (err) {
            emitter.emit("error", err);
        }
        else if (!data) {
            new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                fbId: profile.id,
                accessToken: accessToken,
                profilePicUrl: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
                About: "",
                profileData: {
                    Birthday: "",
                    Gender: "",
                    Mobile: "",
                    CurrentCity: ""
                },
                Address: {
                    Hometown: "",
                    City: "",
                    State: "",
                    Country: "",
                    pin: ""
                }
            }).save(function (err, user) {
                    if (err) {
                        log.error(err);
                        emitter.emit("error", err);
                    }
                    else {
                        log.info('user is created');
                        emitter.emit("success", user)
                    }
                });
        }
        else if (data) {
            emitter.emit('success', data);
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
            emitter.emit("error", err);
        }
        else {
            emitter.emit('success', data);
        }
    })
}.toEmitter();

exports.getProfileDeta = function (userId) {
    var emitter = this;
    User.findOne({_id: userId}, {email: 1, profileData: 1, Address: 1, About: 1, profilePicUrl: 1}, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else {
            emitter.emit(EventName.DONE, data);
        }
    })
}.toEmitter();

exports.updateProfileDeta = function (userId, userData) {
    var emitter = this;
    log.info(">>>>>>>>>>userData>>>>>>>>>.",userData);
    User.update({_id: userId}, {$set:{
        'profileData.Birthday': userData.profileData.Birthday,
        'profileData.Gender': userData.profileData.Gender,
        'profileData.Mobile': userData.profileData.Mobile,
        'profileData.CurrentCity':userData.profileData.CurrentCity,
        'Address.Hometown':userData.Address.Hometown,
        'Address.City': userData.Address.City,
        'Address.State': userData.Address.State,
        'Address.Country': userData.Address.Country,
        'Address.pin': userData.Address.pin
    }}, {upsert: true }, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else {
            log.info(">>>>>>>>>>result Data>>>>>>>>>.",data);
            emitter.emit(EventName.DONE, data);
        }
    });
}.toEmitter();

exports.updateAboutInfo = function (userId, userData) {
    var emitter = this;
    log.info(">>>>>>>>>>userData>>>>>>>>>.",userData);
    User.update({_id: userId}, {$set:{
        'About': userData.About}}, {upsert: true }, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else {
            log.info(">>>>>>>>>>result Data>>>>>>>>>.",data);
            emitter.emit(EventName.DONE, data);
        }
    });
}.toEmitter();
/*,About:userData.About,profilePicUrl:userData.profilePicUrl*/
