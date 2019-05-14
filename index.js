const fetch = require('node-fetch');

// TODO: this is the technical username that you can find in your subscription on https://accounts.bosch-iot-suite.com/subscriptions/
//  click 'Show Credentials' and use the username
const insightsUsername = '';
// TODO: this is the password for the technical user. It is also shown on the same page as the username
const insightsPassword = '';
// TODO: this is the project name of your Insights booking. You can find this on the same page as username and password
const insightsProject = '';

// TODO: choose what data you want to publish
const jsonData = {
    foo: "bar"
};

// send the data
sendJsonToInsightsDataRecorder(insightsProject, insightsUsername, insightsPassword, jsonData)
    .then(response => console.log(`Successfully sent data to Insights data recorder API with response code ${response.status}`))
    .catch(error => console.error(error));

/**
 * Will send the json object to the Insights data recorder API.
 * @param project the Insights project name.
 * @param username the username of the Insights instance.
 * @param password the password of the Insights instance.
 * @param jsonData the json object to send to Insights.
 * @returns {*|Promise} Promise you can listen on which will return a json status response.
 */
function sendJsonToInsightsDataRecorder(project, username, password, jsonData) {
    const basicAuth = Buffer.from(`${insightsUsername}:${insightsPassword}`).toString('base64');
    const url = `https://bosch-iot-insights.com/data-recorder-service/v2/${project}`;
    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`
            },
            body: JSON.stringify(jsonData),
        }
    );
}
