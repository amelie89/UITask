Feature: Filling out forms

  Background:
    Given user navigates to the page

  Scenario: Fill out first form and verify the message
    When user fill out and submit the first form
    Then user verifies message for the first form

  Scenario: Fill out second form and verify the message
    When user fill out and submit the second form
    Then user verifies message for the second form

