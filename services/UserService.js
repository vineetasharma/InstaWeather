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
          profilePicUrl:profile.photos[0].value,
          profileData:{
              About:"",
              Birthday:"",
              Gender:"",
              Mobile:"",
              CurrentCity:""
          },
          Address:{
              Hometown:"",
              City:"",
              State:"",
              Country:"",
              pin:""
          }
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
    console.log(profile,'FB profile');
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
                profilePicUrl:'https://graph.facebook.com/'+profile.id+'/picture?type=small',
                profileData:{
                    About:"",
                    Birthday:"",
                    Gender:"",
                    Mobile:"",
                    CurrentCity:""
                },
                Address:{
                    Hometown:"",
                    City:"",
                    State:"",
                    Country:"",
                    pin:""
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

exports.getProfileDeta = function (userId) {
    var emitter = this;
    User.findOne({_id: userId},{profileData:1,Address:1}, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else{
            emitter.emit(EventName.DONE, data);
        }
    })
}.toEmitter();
