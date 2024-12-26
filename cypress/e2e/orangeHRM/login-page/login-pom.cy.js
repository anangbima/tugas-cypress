/// <reference types="cypress"/>
import LoginPage from "../pages/LoginPage";

describe.only("Login Feature", () => {
    beforeEach(() => {
        LoginPage.visit();
    });

    it("Login with Valid credentials", () => {
        LoginPage.getLoginTitle().should("have.text", "Login");
        LoginPage.getUsernameInput().type("Admin");
        LoginPage.getPasswordInput().type("admin123");
        cy.intercept("GET", "**/employees/action-summary").as("actionSummary");
        LoginPage.getLoginButton().click();
        cy.wait("@actionSummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });
        LoginPage.verifyRedirectToDashboard();
    });

    it("Login with Invalid credentials", () => {
        LoginPage.getUsernameInput().type("InvalidUser");
        LoginPage.getPasswordInput().type("InvalidPass");
        LoginPage.getLoginButton().click();
        LoginPage.getAlertContent().should("contain.text", "Invalid credentials");
        LoginPage.verifyRedirectToLogin();
    });

    it("Login with empty username", () => {
        LoginPage.getPasswordInput().type("admin123");
        LoginPage.getLoginButton().click();
        LoginPage.getInputGroupMessage().should("contain.text", "Required");
        LoginPage.verifyRedirectToLogin();
    });

    it("Login with empty password", () => {
        LoginPage.getUsernameInput().type("Admin");
        LoginPage.getLoginButton().click();
        LoginPage.getInputGroupMessage().should("contain.text", "Required");
        LoginPage.verifyRedirectToLogin();
    });

    it("Login with empty username and password", () => {
        LoginPage.getLoginButton().click();
        LoginPage.getInputGroupMessage().should("contain.text", "Required");
        LoginPage.verifyRedirectToLogin();
    });

    it("Check Forgot Password link", () => {
        LoginPage.getForgotPasswordLink().should("be.visible").click();
        cy.url().should("include", "/auth/requestPasswordResetCode");
    });

    it("Send Reset Password request", () => {
        LoginPage.getForgotPasswordLink().should("be.visible").click();
        cy.url().should("include", "/auth/requestPasswordResetCode");
        LoginPage.getUsernameInput().type("Admin");
        LoginPage.getResetPasswordButton().click();
        cy.url().should("include", "/auth/sendPasswordReset");
        LoginPage.getForgotPasswordTitle().should(
            "have.text",
            "Reset Password link sent successfully"
        );
    });

    it("Check elements on login page", () => {
        LoginPage.getLoginTitle().should("have.text", "Login");
        LoginPage.getUsernameInput().should("be.visible");
        LoginPage.getPasswordInput().should("be.visible");
        LoginPage.getLoginButton().should("be.visible");
        LoginPage.getForgotPasswordLink().should("be.visible");
    });
});
