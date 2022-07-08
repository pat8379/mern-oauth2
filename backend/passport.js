const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/usersModel')
const OAuth = require('./models/oAuthModel')
const bcrypt = require('bcryptjs')

// const strategy = new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
//     try {
//         const user = await User.findOne({username: username})
//         if (user && (await bcrypt.compare(password, user.password))) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }        
//     } catch (error) {
//         done(error)
//     }

// })

const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    }

    // console.log(profile)

    try {
      let user = await OAuth.findOne({ googleId: profile.id })

      if (user) {
        done(null, user)
      } else {
        user = await OAuth.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  })

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    OAuth.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});