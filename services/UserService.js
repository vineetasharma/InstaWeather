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