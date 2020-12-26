import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'
import { PieChart } from 'react-minimal-pie-chart';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card light-blue lighten-5" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">
                            {survey.title}
                        </span>
                        <p>
                            {survey.body}

                        </p>

                        <p className="right">
                            Published: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                        <span className="right" style={{display: "inline-block"}}>
                        <PieChart style={{ height: "20px", display: "inline", padding:0, margin:0 }}
                            id={`pie${survey.title}`}
                            className="left"
                            data={[
                                { title: 'Yes', value: survey.yes, color: 'blue' },
                                { title: 'No', value: survey.no, color: 'red' }
                            ]}
                            viewBoxSize={[100, 100]} />
                        </span>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>)
    }
}


function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)