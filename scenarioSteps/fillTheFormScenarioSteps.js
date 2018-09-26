import fillTheForm from "../pages/fillTheFormPage"

const data = require("../data/data.js")
const { Given, When, Then } = require("cucumber")

Given(/^user navigates to the page$/, function () {
	fillTheForm.navigateToThePage(data.url, data.title)
})

When(/^user fill out and submit the first form$/, function () {
	fillTheForm.fillOutFirstForm(data.name, data.message)
	fillTheForm.submitFirstForm()
})

Then(/^user verifies message for the first form$/, function () {
	fillTheForm.verifyConfirmationForTheFirstForm(data.firstConfirmationMessage)
})

When(/^user fill out and submit the second form$/, function () {
	fillTheForm.fillOutSecondForm(data.name, data.message)
	fillTheForm.submitSecondForm()
})

Then(/^user verifies message for the second form$/, function () {
	fillTheForm.verifyConfirmationForTheSecondForm(data.secondConfirmationMessage)
})
