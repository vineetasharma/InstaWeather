var EventName = require("../src/enum/EventName");
var fs=require('fs');
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
exports.sendMailService = function (mailData) {
    var emitter = this;
    var file=fs.readFileSync(_process.cwd()+'/web-app/dev/views/mailMessage.ejs',"utf8");
    var html=_ejs.render(file,mailData);
    console.log(mailData, 'maildata');
    var transport = _nodemailer.createTransport( {
        service: _config.mailService.service,
        auth: {
            user: _config.mailService.email,
            pass: _config.mailService.pass
        }
    });
    var options = {
        from:_config.mailService.email,
        to: _config.mailService.email,
        subject: 'Message from '+mailData.name,
        html:html
    };
    transport.sendMail(options, function (err,res) {

        if (err) {
            log.info('in User service  err ',err.message);
            emitter.emit(EventName.ERROR, err);
        }
        else {
            emitter.emit(EventName.DONE,res);
        }

    });
}.toEmitter();