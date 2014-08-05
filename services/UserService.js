exports.findOrCreateTwitterAccountService = function (profile) {
    console.log("twitter profile........",profile);
  var emitter = this;
    var twitterUserName=profile.username;
    console.log(twitterUserName+"username");
    console.log(profile.photos[0].value+"username urrrrrrrrrrrrrrrrrrrllllllllllllllllllllllll");
  User.findOne({twitterId: twitterUserName}, function (err, data) {
    if (err) {
      emitter.emit("error", err);
    } else if (!data) {
      new User({
          username: profile.displayName,
          twitterId: twitterUserName,
        enabled: true,
          profilePicUrl:profile.photos[0].value
//          accessToken:
      }).save(function (err) {
          if (err) {
            log.error(err);
          }
          else {
            log.info('user is created');
          }
        });
      emitter.emit('success', profile.displayName);
    }
    if (data) {
      log.info("Welcome", profile.displayName);
      emitter.emit('success', profile.displayName);
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