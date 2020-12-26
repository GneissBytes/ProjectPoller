module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(403).send({ error: 'You must be logged in!' })
}

module.exports.hasCredits = (req, res, next) => {
    if (req.user.credits > 0) {
        return next()
    }
    res.status(403).send({ error: 'You don\' have enough credits!' })

}

module.exports.wrapAsync = (func) => {
    return (req, res, next) => {
        try {
            func(req, res, next)
        } catch (err) {
            res.status(422).send(err.message)
        }
    };
};