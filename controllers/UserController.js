
exports.findOrCreateTwitterAccountController=function(accessToken, refreshToken, profile, done){
    UserService.findOrCreateTwitterAccountService(profile,done);
    log.info("twitter user controller profile", req.user);
};


exports.findOrCreateFacebookAccountController=function(accessToken, refreshToken, profile, done){
    UserService.findOrCreateFacebookAccountService(profile,done);
    log.info("facebook user controller profile", profile);
};

exports.logout=function(req,res){
    log.info(req.session.user);
};