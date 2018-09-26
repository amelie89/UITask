
class Data {
	get url () { return "https://www.ultimateqa.com/filling-out-forms/" }
	get title () { return "Filling Out Forms - Ultimate QA" }
	get name () { return "Test" }
	get message () { return "message" }
	get firstConfirmationMessage () { return "Form filled out successfully" }
	get secondConfirmationMessage () { return "Success" }
	get warningMessage () { return "Please, fill in the following fields:" }
}

module.exports = new Data()
