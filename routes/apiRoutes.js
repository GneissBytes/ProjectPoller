const express = require('express');
const router = express.Router();
const {logout, getCurrentUser } = require('../controllers/apiControllers')

router.get('/current_user', getCurrentUser);

router.get('/logout', logout);


module.exports = router;