import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'


class SurveyNew extends Component {
    constructor(props) {
        super(props)
        this.state = { showFormReview: false }
    }

    onSurveySubmit() {
        this.setState({ showFormReview: true })
    }

    onCancel() {
        this.setState({ showFormReview: false })
    }

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.onCancel()} />;
        }
        return <SurveyForm
            onSurveySubmit={() => this.onSurveySubmit()}
        />
    }

    render() {
        return (
            <div style={{ marginTop: '50px' }} className="container">
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);