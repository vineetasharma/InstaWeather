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
          profilePicUrl:profile.photos[0].value
      }).save(function (err,user) {
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
            emitter.emit('success', data);
        }
    })
}.toEmitter();
