

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

exports.getProfileDeta = function (req, res) {
    UserService.getProfileDeta(req.params._id)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
        })
        .on(EventName.DONE, function (profileData) {
            res.sendSuccessAPIResponse(profileData, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
        });
};

exports.updateProfileInfo = function (req, res) {
    UserService.updateProfileDeta(req.params._id,req.body.userData)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
        })
        .on(EventName.DONE, function (result) {
            res.sendSuccessAPIResponse(result, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
        });
};

exports.updateAboutInfo = function (req, res) {
    UserService.updateAboutInfo(req.params._id,req.body.userData)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
        })
        .on(EventName.DONE, function (result) {
            res.sendSuccessAPIResponse(result, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
        });
};
