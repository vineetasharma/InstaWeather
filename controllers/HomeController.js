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
    if(req.user) {
        res.loginUser(req.user._id, req.user.username, ['user']);
    }
    var user=req.checkLoggedIn();
    res.render('index', {user: (user? user : (req.user ? req.user : null))});
};
