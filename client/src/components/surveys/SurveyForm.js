import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';





class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ name, label }) => {
            return <Field component={SurveyField}
                key={name}
                type="text"
                name={name}
                label={label}
            />
        })
    }



    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel<i className="material-icons right">arrow_back</i>
                    </Link>
                    <button type="submit" className="blue btn-flat right white-text">
                        Next
                <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}


function validate(values) {
    const errors = {}
    _.forEach(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must submit ${name}.`
        }
    })
    if (values['recipients']) {
        errors['recipients'] = validateEmails(values['recipients']);
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)