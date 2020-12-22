import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions'
class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
            // displayed as header
            name="ProjectPoll"
            //
            description="$5 for 5 tokens"
            // ammount in cents
            amount={500}
            // callback when token is retrieved
            token={token => this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
            >
                <button className="btn orange darken-4">Buy more tokens</button>
            </StripeCheckout>
        )
    }
};



export default connect(null, actions)(Payments);