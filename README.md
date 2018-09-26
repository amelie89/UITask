# WebdriverIO-Selenium-Cucumber
This is a framework based on WebdriverIO and Selenium + Cucumber to allow us to write automated tests. It displays all the perks of BDD, since it is more than just testing.

The example tests show submitting the form and verifying the results

Technologies used
- JavaScript
- WebdriverIO
- Selenium
- Cucumber
- npm

# Setup and installation

Development IDE: Webstorm

Prerequisite: node.js and npm installed on machine

In order to use the JavaScript task runner Grunt, following commands needs to be executed:
```sh
npm install grunt --save-dev
npm install -g grunt-cli
```
As a solution webdriverIO framework with selenium and cucumber was implemented.
First, to be able to use the webdriverIO cucumber framework, we need to install the adapter package from npm:
```sh
npm install wdio-cucumber-framework --save-dev
```
All the required dependencies are added in `package.json` file. To grab the dependencies we need to run ```npm install```.

**WebdriverIO config file**
Since WebdriverIO uses config files to setup and to execute tests, all config files are located in `config` directory. Following code shows the structure of the `wdio.conf.js` file:
 
 ```sh
exports.config = {

    specs: [
        './resources/*.feature',
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,
    capabilities: [

        {
           browserName: 'chrome',
            maxInstances: '5',
        },
    ],

    // ===================
    // Test Configurations
    // ===================
    sync: true,
    .
    .
    .
    services: ['selenium-standalone'],
    framework: 'cucumber',
    reporters: ['allure'],
```

# How to run tests

To run the tests, first we need to specify in config file which features will be executed. Currently, it is set up to include all feature files - `./resources/*.feature`
Following two commands can be used to execute the tests:
```
npm run test
grunt webdriver:test
```

# Reports
Allure reporter is implemented, all the dependencies are included in `package.json` file.
After the test run, in order to generate and view allure reports locally, following command needs to be executed:
```
run npm run allure-report.
```

# Test structure and feature files

Project is structured using three level of abstractions:
- Feature files
- Scenario steps
- Page object

Feature files are located in the `./resources/` directory, and they are written in the Cucumber using the Gherkin syntax.

Two tests are created, one is to fill out both forms on the page, and to verify the success message (Feature: `fillTheForm`):
```
Feature: Filling out forms

  Background:
    Given user navigates to the page

  Scenario: Fill out first form and verify the message
    When user fill out and submit the first form
    Then user verifies message for the first form

  Scenario: Fill out second form and verify the message
    When user fill out and submit the second form
    Then user verifies message for the second form
```
The second negative test, is validation on the page when user submits the form without filling out any data, and to verify the warning message (Feature:`fillTheFormNegativeScenario`):
```
Feature: Filling the form negative scenario

  Background:
    Given user navigates to the page

  Scenario: Submit the first form without filling the name and message
    When user submit the first form without filling out name and message
    Then user verifies warning message for the first form

```

Next level of abstraction are scenario steps which are actually used as the interface between the feature files and pages. All steps from feature files are implemented in scenario steps.
Following example shows the scenario steps for the first test. Firstly, we need to import the page files we are going to use, and to define the Given, When, Then annotations. Since all the methods, interaction with the application and behavior is implemented on the page level, it is pretty simple to follow the structure.
The only job is to create functions, call the appropriate method, and to call and define parameters from the data file.
```
import fillTheForm from '../pages/fillTheFormPage';
const data = require("../data/data.js");
const {Given,When,Then} = require('cucumber');

Given(/^user navigates to the page$/, function () {
    fillTheForm.navigateToThePage(data.url, data.title);
});

When(/^user fill out and submit the first form$/, function () {
    fillTheForm.fillOutFirstForm(data.name, data.message);
    fillTheForm.submitFirstForm();
});

Then(/^user verifies message for the first form$/, function () {
    fillTheForm.verifyConfirmationForTheFirstForm(data.firstConfirmationMessage);
});

When(/^user fill out and submit the second form$/, function () {
    fillTheForm.fillOutSecondForm(data.name, data.message);
    fillTheForm.submitSecondForm();
});

Then(/^user verifies message for the second form$/, function () {
    fillTheForm.verifyConfirmationForTheSecondForm(data.secondConfirmationMessage);
}); steps implemented for the first test.
```

Last level of abstractions are page objects.
First, we need to create a main page object that is called Page, it is implemented in the `page.js` file:
```
class Page {
    constructor() { }

    open(path) {
        browser.url(path)
        browser.windowHandleMaximize()
    }
}

module.exports = Page;
```

Second page file that is created, `fillTheFormPage` extends the created base page file. First step is to define all the selectors. After that, we create all the necessary methods.

In the first test (filling out the first form) after the page is opened, verification is added to check if the page title is correct. After that, to fill out the first form, method is created to enter the name and message, and then to submit the form. Last method is created to verify the success message.

In the first test (filling out the second form), the method is created to enter the name and message, and since for the captcha the numbers are changing randomly, first we extract the numbers, using regex, then parse the numbers to Integer, add them, and set that value to the input text for the result. As the last part verification is added for the success message.

```
class fillTheFormPage extends Page {

    get firstForm() { return $('div[id="et_pb_contact_form_0"]>div>form') }
   .
   .
    
}

    navigateToThePage(url, title) {
        super.open(url);
        browser.pause(2000);
        browser.getTitle().should.equal(title);
    }

    fillOutFirstForm(name, message) {
        this.nameFirstForm.setValue(name);
        this.messageFirstForm.setValue(message);
    }

    submitFirstForm (){
        this.firstForm.submitForm();
    }

    fillOutSecondForm(name, message) {
        this.nameSecondForm.setValue(name);
        this.messageSecondForm.setValue(message);
        var getNumbers =  this.numbers.getText().match(/\d+/g);
        var sumOfNumbers = parseInt(getNumbers[0]) + parseInt(getNumbers[1]);
        this.inputSumOfNumbers.setValue(sumOfNumbers);
    }

    submitSecondForm(){
        this.secondForm.submitForm();
    }

    verifyConfirmationForTheFirstForm(confirmationMessage){
        browser.pause(3500);
        this.confirmationMessageFirstForm.getText().should.contains(confirmationMessage);
    }

    verifyConfirmationForTheSecondForm(confirmationMessage){
        browser.pause(3500);
        this.confirmationMessageSecondForm.getText().should.equal(confirmationMessage);
    }

}

module.exports = new fillTheFormPage();

```

All the necessary data (urls, name, etc..) are located in the `data.js` file in the `data` directory.

Following screenshots are attached as reference for the test executions and reports.
![testexecution](https://user-images.githubusercontent.com/10046279/46074801-e4044c00-c188-11e8-9b6d-6a2576d45e47.PNG)



![reports](https://user-images.githubusercontent.com/10046279/46074879-2463ca00-c189-11e8-9503-e9cd432e5502.PNG)

The project can serve as a base for further development, implementation and integration.



