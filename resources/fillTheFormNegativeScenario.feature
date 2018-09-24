Feature: Filling the form negative scenario

  Background:
    Given user navigates to the page

  Scenario: Submit the first form without filling the name and message
    When user submit the first form without filling out name and message
    Then user verifies warning message for the first form
