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
    UserService.findOrCreateFacebookAccountService(accessToken, profile)
        .on("success", function (user) {
            done(null, user);
        })
        .on("error", function (err) {
            done(err, profile);
        });
};

exports.getProfileData = function (req, res) {
    UserService.getProfileData(req.params._id)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
        })
        .on(EventName.DONE, function (profileData) {
            res.sendSuccessAPIResponse(profileData, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
        });
};

exports.updateProfileInfo = function (req, res) {
    UserService.valiDateProfileInfo(req, res)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
        })
        .on(EventName.DONE, function (result) {
            UserService.updateProfileInfo(result.fields)
                .on(EventName.ERROR, function (err) {
                    log.error(err);
                    res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
                })
                .on(EventName.DONE, function (result) {
                    res.redirect('/');
                });
        });
};

exports.uploadProfilePic = function (req, res) {
    UserService.valiDateUploadProfilePic(req, res)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
        })
        .on(EventName.DONE, function (result) {
            UserService.uploadProfilePic(result.email, result.profilePicUrl)
                .on(EventName.ERROR, function (err) {
                    log.error(err);
                    res.sendErrorAPIResponse(err, HttpStatusCode.SERVER_ERROR);
                })
                .on(EventName.DONE, function (result) {
                    res.redirect('/');
                });
        });
};

