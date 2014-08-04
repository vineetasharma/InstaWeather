exports.findOrCreateTwitterAccountService = function (twitterUserName, displayName, done) {
    var emitter = this;
    User.findOne({twitterUserId: twitterUserName}, function (err, data) {
        if (err) {
            emitter.emit("error", err);
            done(err,profile);
        }else if (!data) {
            new User({
                name: displayName,
                twitterUserId: twitterUserName,
                enabled: true
            }).save(function (err) {
                    if (err) {
                        log.error(err);
                        done(err, profile);
                    }
                    else {
                        done(null, profile);
                        log.info('user is created');
                    }
                });
            emitter.emit('success', displayName);
        }
        if (data) {
            log.info("Welcome", displayName);
            done(null, profile);
            emitter.emit('success', displayName);
        }
    })
}.toEmitter();

exports.findOrCreateFacebookAccountService = function (profile,done) {
    var emitter = this;
    User.findOne({email: profile.emails[0].value},function (err, data) {
        if (err){
            emitter.emit("error", err);
            done(err,profile)
    }
        else if (!data) {
            new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                fbId: profile.id
            }).save(function (err) {
                    if (err) {
                        log.error(err);
                        done(err, profile);
                    }
                    else {
                        //req.session.user= profile.emails[0].value;
                        log.info('user is created');
                        done(null,profile)
                    }
                    });
            emitter.emit('success', profile);
        }
        else if (data) {
            log.info("Welcome", profile.displayName);
            emitter.emit('success', profile);
            //req.session.user= profile.emails[0].value;
            done(null,profile);
        }
    })
}.toEmitter()