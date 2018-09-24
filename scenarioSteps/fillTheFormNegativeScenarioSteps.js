import fillTheForm from '../pages/fillTheFormPage';

const data = require("../data/data.js");
const {When,Then} = require('cucumber');


When(/^user submit the first form without filling out name and message$/, function () {
    fillTheForm.submitFirstForm();
});

Then(/^user verifies warning message for the first form$/, function () {
    fillTheForm.verifyConfirmationForTheFirstForm(data.warningMessage);
});


