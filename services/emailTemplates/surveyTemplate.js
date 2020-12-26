
module.exports = (survey, redirect) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3><strong>I need your input!</strong></h3>
                <p>Please answer following question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${redirect}/api/surveys/${survey._id}/yes">Yes</a>
                </div>
                <div>
                    <a href="${redirect}/api/surveys/${survey._id}/no">No</a>
                </div>
            </div>
        </body>
    </html>
    `
};