const express = require('express')
const router = express.Router();
const { isLoggedIn } = require('./middleware')
const { AddTokens } = require('../controllers/billingControllers')


router.post('/', isLoggedIn, AddTokens)


module.exports = router