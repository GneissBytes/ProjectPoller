const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const User = mongoose.model('User')


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback', // change to absolute url for https
        proxy: true // or allow prxy
    },
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ googleId: profile.id })
            if (user) {
                return done(null, user)
            }
            const newUser = await new User({ googleId: profile.id }).save();
            done(null, newUser)
        }
    )
)


