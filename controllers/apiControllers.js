module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/')
}

module.exports.getCurrentUser = (req, res) => {
    res.send(req.user)
}