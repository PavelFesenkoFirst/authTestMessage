const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser(function (user, done) {
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "215195187616-a8mtiqedvb2crn8baakbosauslp0hmsb.apps.googleusercontent.com",
      clientSecret: "kthDqBTmeOJMh5AE4StaEsru",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (request, accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      // function (accessToken, refreshToken, profile, done) {
      //   /*
      //  use the profile info (mainly profile id) to check if the user is registerd in ur db
      //  If yes select the user and pass him to the done callback
      //  If not create the user and then select him and pass to callback
      // */
      return done(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: "407343c18d6d9c673aa6",
      clientSecret: "737cad7caf5fb4078fe1e6be74daa8993b9a0991",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
