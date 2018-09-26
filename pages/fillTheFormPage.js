
import Page from "./page"

class fillTheFormPage extends Page {
	get firstForm () { return $("div[id=\"et_pb_contact_form_0\"]>div>form") }

	get secondForm () { return $("div[id=\"et_pb_contact_form_1\"]>div>form") }

	get nameFirstForm () { return $("div[id=\"et_pb_contact_form_0\"]>div>form>p:first-of-type>input") }

	get messageFirstForm () { return $("div[id=\"et_pb_contact_form_0\"]>div>form>p>textarea") }

	get nameSecondForm () { return $("div[id=\"et_pb_contact_form_1\"]>div>form>p:first-of-type>input") }

	get messageSecondForm () { return $("div[id=\"et_pb_contact_form_1\"]>div>form>p>textarea") }

	get confirmationMessageFirstForm () { return $("div[id=\"et_pb_contact_form_0\"]>div") }

	get confirmationMessageSecondForm () { return $("div[id=\"et_pb_contact_form_1\"]>div") }

	get numbers () { return $("span[class=\"et_pb_contact_captcha_question\"]") }

	get inputSumOfNumbers () { return $("input[class=\"input et_pb_contact_captcha\"]") }

	navigateToThePage (url, title) {
		Page.open(url)
		browser.pause(2000)
		browser.getTitle().should.equal(title)
	}

	fillOutFirstForm (name, message) {
		this.nameFirstForm.setValue(name)
		this.messageFirstForm.setValue(message)
	}

	submitFirstForm () {
		this.firstForm.submitForm()
	}

	fillOutSecondForm (name, message) {
		this.nameSecondForm.setValue(name)
		this.messageSecondForm.setValue(message)
		const getNumbers = this.numbers.getText().match(/\d+/g)
		const sumOfNumbers = parseInt(getNumbers[0]) + parseInt(getNumbers[1])
		this.inputSumOfNumbers.setValue(sumOfNumbers)
	}

	submitSecondForm () {
		this.secondForm.submitForm()
	}

	verifyConfirmationForTheFirstForm (confirmationMessage) {
		browser.pause(3500)
		this.confirmationMessageFirstForm.getText().should.contains(confirmationMessage)
	}

	verifyConfirmationForTheSecondForm (confirmationMessage) {
		browser.pause(3500)
		this.confirmationMessageSecondForm.getText().should.equal(confirmationMessage)
	}
}

module.exports = new fillTheFormPage()
