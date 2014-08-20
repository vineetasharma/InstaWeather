//Import Enums
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.findTwitterAccountController = function (accessToken, refreshToken, profile, done) {
    UserService.findTwitterAccountService(profile)
        .on(EventName.DONE, function (user) {
            done(null, user);
        })
        .on(EventName.ERROR, function (err) {
            done(err, profile);
        });
};


exports.findOrCreateFacebookAccountController = function (accessToken, refreshToken, profile, done) {
    UserService.findOrCreateFacebookAccountService(accessToken, profile)
        .on(EventName.DONE, function (user) {
            done(null, user);
        })
        .on(EventName.ERROR, function (err) {
            done(err, profile);
        });
};


exports.addEmailAndCreateTwitterAcc = function (req, res) {
    //Check for Errors
    var errors = req.validationErrors();
    if (Boolean(errors)) {
        res.sendErrorAPIResponse(errors, HttpStatusCode.VALIDATION_ERROR);
    } else {
        UserService.addEmailAndCreateTwitterAcc(req.body.email, req.user)
            .on(EventName.ERROR, function (err) {
                log.error(err);
                res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
            })
            .on(EventName.NOT_FOUND, function () {
                res.redirect('/');
            })
            .on(EventName.DONE, function (user) {
                res.loginUser(user._id, user.username, ['user']);
                res.redirect('/');
            });
    }
};