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
    if(req.user && !(req.user.twitterId)) {
        res.loginUser(req.user._id, req.user.username, ['user']);
    }
    var sessionUser=req.checkLoggedIn();
    res.render('index', {user:{ data: sessionUser? sessionUser : (req.user ? req.user : null)}});
};
