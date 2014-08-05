exports.findOrCreateTwitterAccountController = function (accessToken, refreshToken, profile, done) {
  UserService.findOrCreateTwitterAccountService(profile)
    .on("success", function () {

    })
    .on("error", function () {

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

exports.logout = function (req, res) {
  log.info(req.session.user);
};