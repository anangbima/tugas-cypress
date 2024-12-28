// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import AuthPage from "../e2e/final-quiz/pages/AuthPage";

Cypress.Commands.add("formLogin", (username, password) => {
    AuthPage.getLoginTitle().should("have.text", "Login");
    if (username) {
        AuthPage.getUsernameInput().type(username);
    }
    if (password) {
        AuthPage.getPasswordInput().type(password);
    }
    AuthPage.getLoginButton().click();
});

Cypress.Commands.add("formForgotPassword", (username) => {
    AuthPage.getForgotPasswordLink().click();
    AuthPage.verifyRedirectToRequestResetpassword();
    if (username) {
        AuthPage.getUsernameInput().type(username);
    }
    AuthPage.getResetPasswordButton().click();
});