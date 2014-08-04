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
    if(req.user){
        req.session.user=req.user._json.name;
        //console.info(req.user._json);
    }
    res.render('index', {user: req.session.user ? req.session.user : null});
};