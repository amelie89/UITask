const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 90000;

exports.config = {

    specs: [
        './resources/*.feature',
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    // ============
    // Capabilities
    // ============

    maxInstances: 10,

    capabilities: [

        {
           browserName: 'chrome',
            maxInstances: '5',
        },
        //
       // {
      //     browserName: 'firefox',
        //     // platform: 'Windows 10',
        //     // version: '50.0',
      //    maxInstances: '5',
       //  },

    ],

    // ===================
    // Test Configurations
    // ===================
    sync: true,
    logLevel: 'silent',     // Level of logging verbosity: silent | verbose | command | data | result | error
    coloredLogs: true,      // Enables colors for log output.

    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: 'http://localhost:8080',
    waitforTimeout: 90000,            // Default timeout for all waitFor* commands.
    connectionRetryTimeout: 90000,    // Default timeout in milliseconds for request  if Selenium Grid doesn't send response
    connectionRetryCount: 3,          // Default request retries count

    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    //
    services: ['selenium-standalone'],
    //services: ['selenium-standalone', 'phantomjs', 'appium'],
    //
    framework: 'cucumber',

    reporters: ['allure'],

    reporterOptions: {
        allure: {
            outputDir:   './test/reports/allure-results/',
            disableWebdriverStepsReporting: false,
            useCucumberStepReporter: false,
        },
    },


    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./scenarioSteps/fillTheFormScenarioSteps.js', './scenarioSteps/fillTheFormNegativeScenarioSteps.js'],   // <string[]> (file/dir) require files before executing features
        backtrace: true,    // <boolean> show full backtrace for errors
        compiler: ['js:babel-core/register'], // <string[]> filetype:compiler used for processing required features
        failAmbiguousDefinitions: true,       // <boolean< Treat ambiguous definitions as errors
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        ignoreUndefinedDefinitions: false,    // <boolean> Enable this config to treat undefined definitions as warnings
        name: [],           // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: false,    // <boolean> hide step definition snippets for pending steps
        source: false,      // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: true,       // <boolean> fail if there are any undefined or pending steps
        tagExpression: 'not @Pending',      // <string> (expression) only execute the features or scenarios with tags matching the expression, see https://docs.cucumber.io/tag-expressions/
        timeout: defaultTimeoutInterval,    // <number> timeout for step definitions
        tagsInTitle: false,                 // <boolean> add cucumber tags to feature or scenario name
        snippetSyntax: undefined,           // <string> specify a custom snippet syntax
    },

    before: function() {
        /**
         * Setup the Chai assertion framework
         */
        const chai    = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
    },

};
