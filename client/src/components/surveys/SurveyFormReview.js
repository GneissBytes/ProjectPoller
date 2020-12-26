import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import FIELDS from './formFields';
import * as actions from '../../actions';



const SurveyFormReview = ({ onCancel, formValues, submitForm, history }) => {
    const formFields = _.map(FIELDS, ({ name, label }) => {
        return <div key={name}>
            <label style={{ marginBottom: '0' }} >{label}</label>
            <div style={{ marginTop: '0' }}>
                <h5 style={{ marginTop: '0' }}>{formValues[name]}</h5>
            </div>
        </div>
    })
    return (
        <div>
            <h5>Pleace confirm your entries</h5>
            {formFields}
            <button className="btn orange darken-3 btn-flat left white-text"
                onClick={onCancel}>
                Go back<i className="material-icons right">arrow_back</i>
            </button>
            <button
                onClick={() => submitForm(formValues, history)}
                className="btn blue btn-flat white-text right">
                Submit form<i className="material-icons right">send</i>
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));