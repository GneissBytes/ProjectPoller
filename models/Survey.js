const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: {
        type: Boolean,
        default: false
    }
})

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [recipientSchema],
    _user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    dateSent: Date,
    lastResponded: Date
})



module.exports = mongoose.model('Survey', surveySchema)