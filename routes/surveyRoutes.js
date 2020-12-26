const express = require('express')
const router = express.Router();
const { isLoggedIn, hasCredits, wrapAsync } = require('./middleware')
const { SubmitSurvey, handleEvents, getSurveys } = require('../controllers/surveyControllers')


router.post('/', isLoggedIn, hasCredits, wrapAsync(SubmitSurvey))

router.post('/webhooks', wrapAsync(handleEvents))

router.get('/:surveyId/:choice', (req, res) => {
    res.send('Thank you for voting!')
})

router.get('/', isLoggedIn, wrapAsync(getSurveys))

module.exports = router;