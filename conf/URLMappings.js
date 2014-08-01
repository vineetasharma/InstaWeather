/**
 * URL Mappings are done in this file.
 *
 * "_app" is the express app object. Rest is all express.
 * */

//Require Controllers
var controllers = {
  cluster: require("../controllers/ClusterController"),
  user: require("../controllers/UserController"),
  home: require("../controllers/HomeController")
};

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: _config.facebookAuth.clientID,
    clientSecret: _config.facebookAuth.clientSecret,
    callbackURL: _config.facebookAuth.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {

    done(null, profile);
  }
));
//Cluster API
_app.get("/cluster/worker/list", controllers.cluster.list);

//Home/Auth URL Mappings
_app.get('/', controllers.home.index);

//User routes
_app.get('/logout', controllers.user.logout);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
_app.get('/auth/facebook', passport.authenticate('facebook'), {scope:'email'});

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
_app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/login' }));