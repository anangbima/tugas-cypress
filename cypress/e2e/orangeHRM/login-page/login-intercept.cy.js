/// <reference types="cypress"/>

describe("Login Feature", () => {
    beforeEach(() => {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
    });

    it("Login with Valid credentials", () => {
        cy.get(".oxd-text--h5.orangehrm-login-title").should("have.text", "Login");
        cy.get('input[name="username"]').type("Admin");
        cy.get('input[name="password"]').type("admin123");
        cy.intercept("GET", "**/employees/action-summary").as("actionSummary");
        cy.get(".oxd-button--main.orangehrm-login-button").click();
        cy.wait("@actionSummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });
        cy.url().should("include", "/dashboard/index");
    });
    it("Login with Invalid credentials", () => {
        cy.get('[name="username"]').type("InvalidUser");
        cy.get('[name="password"]').type("InvalidPass");
        cy.get(
            '[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
        ).click();
        cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
        cy.url().should("include", "/auth/login");
    });

    it("Login with empty username", () => {
        cy.get('[name="password"]').type("admin123");
        cy.get(
            '[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
        ).click();
        cy.get(".oxd-input-group__message").should("contain.text", "Required");
        cy.url().should("include", "/auth/login");
    });

    it("Login with empty password", () => {
        cy.get('[name="username"]').type("Admin");
        cy.get(
            '[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
        ).click();
        cy.get(".oxd-input-group__message").should("contain.text", "Required");
        cy.url().should("include", "/auth/login");
    });

    it("Login with empty username and password", () => {
        cy.get(
            '[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
        ).click();
        cy.get(".oxd-input-group__message").should("contain.text", "Required");
        cy.url().should("include", "/auth/login");
    });

    it("Check Forgot Password link", () => {
        cy.get(".orangehrm-login-forgot").should("be.visible").click();
        cy.url().should("include", "/auth/requestPasswordResetCode");
    });
    it("Send Reset Password request", () => {
        cy.get(".orangehrm-login-forgot").should("be.visible").click();
        cy.url().should("include", "/auth/requestPasswordResetCode");
        cy.get('[name="username"]').type("Admin");
        cy.get(".orangehrm-forgot-password-button--reset").click();
        cy.url().should("include", "/auth/sendPasswordReset");
        cy.get(".oxd-text--h6.orangehrm-forgot-password-title").should(
            "have.text",
            "Reset Password link sent successfully"
        );
    });
    it("Check elements on login page", () => {
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should(
            "have.text",
            "Login"
        );
        cy.get('[name="username"]').should("be.visible");
        cy.get('[name="password"]').should("be.visible");
        cy.get(
            '[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
        ).should("be.visible");
        cy.get(".orangehrm-login-forgot").should("be.visible");
    });
});
