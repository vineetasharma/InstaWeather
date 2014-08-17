//Import Enums
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
          email:"",
          profilePicUrl:profile.photos[0].value
      }).save(function (err,user) {
          if (err) {
            log.error(err);
              emitter.emit('error', err);
          }
          else {
            log.info('user is created');
              emitter.emit('success', user);
          }
        });
    }
    if (data) {
      log.info("Welcome", profile.displayName);
      emitter.emit('success', data);
    }
  })
}.toEmitter();

exports.findOrCreateFacebookAccountService = function (accessToken,profile) {
    var emitter = this;
    User.findOne({email: profile.emails[0].value}, function (err, data) {
        if (err) {
            emitter.emit("error", err);
        }
        else if (!data) {
            new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                fbId: profile.id,
                accessToken: accessToken
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
            log.info("Welcome", profile.displayName);
            emitter.emit('success', data);
        }
    })
}.toEmitter();


exports.addLastSearchedLocation = function (userId,lastSearchedLocation ) {
    var emitter = this;
    var location={
        geoNameId: lastSearchedLocation.geoNameId,
        locationName: lastSearchedLocation.locationName,
        fullName: lastSearchedLocation.fullName,
        latitude: lastSearchedLocation.latitude,
        longitude: lastSearchedLocation.longitude
    };
    User.update({_id: userId},{$set:{lastSearchedLocation : location}}, function (err, data) {
        if (err) {
            log.info("Error in update lastSearchedLocation");
            emitter.emit("error", err);
        }
        else{
            log.info("sucessfull update lastSearchedLocation: ",data);
            emitter.emit('success', data);
        }
    })
}.toEmitter();

exports.addEmail = function (userId,email) {
    var emitter = this;
    User.update({_id: userId},{$set:{email : email}}, function (err, data) {
        if (err) {
            log.info("Error in update email");
            emitter.emit(EventName.ERROR, err);
        }
        else{
            log.info("email sucessfull updated: ",data);
            emitter.emit(EventName.DONE, data);
        }
    })
}.toEmitter();