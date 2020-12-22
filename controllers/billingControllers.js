const stripeSecret = process.env.STRIPE_SECRET
const stripe = require('stripe')(stripeSecret)



module.exports.AddTokens = async (req, res) => {
    const user = req.user;
    stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: 'Payment for 5 tokens',
        source: req.body.id
    })
    user.credits += 5;
    await req.user.save();
    res.send(user)
}