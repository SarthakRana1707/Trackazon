const passport = require('passport');
const User = require('../model/user');
//passport is required to create strategies
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// i will create all the stragies in this file
// -local
passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField: 'password'
},
  async function(email, password, done) {
    try{
      let user = await User.findOne({ email: email }) 
      if (!user)  return done(null, false); 
      // if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    }
    catch(err){
      return done(err);
    }
  }
));

//  passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         // if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));
// -facebook
passport.use(new FacebookStrategy({
  clientID: "2205326726527802",
  clientSecret: "f36a168c3936deba36b2e4ac3235b683",
  callbackURL: "http://localhost:4444/login/auth/facebook/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  console.log("AccessToken:", accessToken)
  console.log("refreshToken", refreshToken)
  console.log("profile:", profile);
  try{
    let user = await User.findOne({
      fbId: profile.id
    })
    if(user) return cb(null, user);
    user = await User.create({
      fbAccessToken: accessToken,
      fbId: profile.id,
      email: profile.displayName,
      isAdmin: false
    });
    cb(null, user);
  }
  catch(err){
    cb(err, false);
  }
}
));
// -google


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4444/login/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log("AccessToken:", accessToken)
    console.log("refreshToken", refreshToken)
    console.log("profile:", profile);
    try{
      let user = await User.findOne({
        googleId: profile.id
      })
      if(user) return cb(null, user);
      user = await User.create({
        googleAccessToken: accessToken,
        googleId: profile.id,
        email: profile.displayName,
        isAdmin: false
      });
      cb(null, user);
    }
    catch(err){
      cb(err, false);
    }
  }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(async function(id, done) {
  try{
    let user = await User.findById(id);
    done(null, user);
  }
  catch(err){
    done(err, false);
  }
});

module.exports = passport;