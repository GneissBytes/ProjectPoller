if (process.env.NODE_ENV !== "production") require('dotenv').config()

const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/User')
require('./services/mongodb')
require('./services/passport')
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')
const billingRoutes = require('./routes/billingRoutes')

const app = express()

app.use(express.json())
app.use(
    cookieSession({
        maxAge: 7 * 3600 * 1000,
        keys: [process.env.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes)
app.use('/api', billingRoutes)
app.use('/auth', authRoutes)



if (process.env.NODE_ENV == 'production') {
    const path = require('path');
    // Express will send static production assets, ie main.js main.css
    app.use(express.static(path.join(__dirname, 'client/build')))
    // Express will send index.html if route is unknown
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('*', (_req, res) => {
        res.send('<h1>404 not found</h1>')
    });
}

port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`listening at ${port}`)
})