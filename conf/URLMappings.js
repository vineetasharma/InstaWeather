/**
 * URL Mappings are done in this file.
 *
 * "_app" is the express app object. Rest is all express.
 * */

//Require Controllers
var controllers = {
  cluster: require("../controllers/ClusterController"),
  user: require("../controllers/UserController"),
  home: require("../controllers/HomeController"),
  location:require("../controllers/LocationController")
};

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy;


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
  }, controllers.user.findOrCreateFacebookAccountController
));

passport.use(new TwitterStrategy({
  consumerKey: _config.twitterAuth.consumerKey,
  consumerSecret: _config.twitterAuth.consumerSecret,
  callbackURL: _config.twitterAuth.callbackURL
}, controllers.user.findOrCreateTwitterAccountController));

//Cluster API

_app.get("/cluster/worker/list", controllers.cluster.list);

//Home/Auth URL Mappings
_app.get('/', controllers.home.index);


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
_app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
_app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/' }));


// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
_app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
_app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
    failureRedirect: '/' }));

_app.get('/logout', function (req, res) {
  res.logoutUser();
  res.redirect('/');
});

_app.post('/addlocationdata',controllers.location.saveSearchPlaceDetails);

_app.get('/getMostSearchPlaceDetails',controllers.location.getMostSearchPlaceDetails);

_app.get('/getLastSearchLocation',controllers.location.getLastSearchLocation);

_app.post('/sendMail',controllers.home.sendMail);

_app.get('/getProfileDeta?:_id',controllers.user.getProfileDeta);