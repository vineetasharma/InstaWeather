/**
 * Home Controller
 *
 * Handles the routes responsible for public facing pages (non-logged in pages)
 *
 * */

/**
 * Handles the route which renders the home page
 * @url "/"
 * */
exports.index = function (req, res) {
    if(req.user && req.user.email) {
        res.loginUser(req.user._id, req.user.username, ['user']);
    }
    var sessionUser=req.checkLoggedIn();
    res.render('index', {user: sessionUser? sessionUser : (req.user ? req.user : null)});
};

exports.askemail = function (req, res) {
    if(req.user.email)
        res.redirect('/');
    else
        res.render('askemail', {user:res.user});
};

/*
exports.getSuccessRedirect=function (req, res) {
    var successRedirect = '';
    var  isEmail=res.email?true:false;
    if (isEmail) {
        log.info("isEmail true");
        successRedirect = '/';
    }
    else {
        log.info("isEmail false");
        successRedirect = '/askemail';
    }
    return successRedirect;
};
*/
