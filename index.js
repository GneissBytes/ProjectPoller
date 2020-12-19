if (process.env.NODE_ENV !== "production") require('dotenv').config()

const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/User')
require('./services/mongodb')
require('./services/passport')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(
    cookieSession({
        maxAge: 7 * 3600 * 1000,
        keys: [process.env.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes)

app.get('*', (req, res) => {
    res.send('<h1>404 not found</h1>')
});

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening at ${port}`)
})