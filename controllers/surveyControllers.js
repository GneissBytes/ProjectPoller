const Survey = require('mongoose').model('Survey')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const { Path } = require('path-parser')
const { URL } = require('url')
const _ = require('lodash'); ``


module.exports.SubmitSurvey = async (req, res) => {
    const _user = req.user._id;
    const { title, subject, body, recipients } = req.body;
    const recipientList = recipients.split(',')
        .map((email) => (
            { email: email.trim() }
        ));

    const survey = new Survey(
        {
            title,
            subject,
            body,
            _user,
            recipients: recipientList,
            dateSent: Date.now()
        })

    //send out notifications
    const mailer = new Mailer(survey, surveyTemplate(survey, process.env.REDIRECT_DOMAIN));
    await mailer.send()
    await survey.save()

    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
}

module.exports.handleEvents = (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')
    const events = _.chain(req.body)
        .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname)
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice }
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(async ({ email, surveyId, choice }) => {
            await Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 },
                $set: {
                    'recipients.$.responded': true,
                    lastResponded: new Date()
                },
            }).exec();
        })
        .value();
    res.send({})
}

module.exports.getSurveys = async (req, res) => {
    const { _id } = req.user;
    const surveys = await Survey.find({
        _user: _id
    }).select({ recipients: false })
    res.send(surveys)
}