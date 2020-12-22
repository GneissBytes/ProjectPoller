module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(403).send({ error: 'You must be logged in!'})
}