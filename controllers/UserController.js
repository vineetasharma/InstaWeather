//Import Enums
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.findOrCreateTwitterAccountController = function (accessToken, refreshToken, profile, done) {
  UserService.findOrCreateTwitterAccountService(profile)
    .on("success", function (user) {
          done(null, user);
    })
    .on("error", function (err) {
          done(err, user);
    });
};


exports.findOrCreateFacebookAccountController = function (accessToken, refreshToken, profile, done) {
  UserService.findOrCreateFacebookAccountService(accessToken,profile)
    .on("success", function (user) {
      done(null, user);
    })
    .on("error", function (err) {
      done(err, profile);
    });
};


exports.addEmail = function (req, res) {
    //Check for Errors
    var errors = req.validationErrors();
    if (Boolean(errors)) {
        res.sendErrorAPIResponse(errors, HttpStatusCode.VALIDATION_ERROR);
    } else {
            UserService.addEmail(req.params._id,req.body.email)
                .on(EventName.ERROR, function (err) {
                    log.error(err);
                    res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
                })
                .on(EventName.DONE, function (location) {
                    res.sendSuccessAPIResponse(location, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
                });
    }
};