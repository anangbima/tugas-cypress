// Implementasi POM
export default class LoginPage {
    static visit() {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
    }
    static verifyRedirectToDashboard() {
        cy.url().should("include", "/dashboard/index");
    }
    static verifyRedirectToLogin() {
        cy.url().should("include", "/auth/login");
    }
    static getUsernameInput() {
        return cy.get('input[name="username"]');
    }

    static getPasswordInput() {
        return cy.get('input[name="password"]');
    }

    static getLoginButton() {
        return cy.get(
            ".oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button"
        );
    }

    static getLoginTitle() {
        return cy.get(".oxd-text--h5.orangehrm-login-title");
    }

    static getAlertContent() {
        return cy.get(".oxd-alert-content.oxd-alert-content--error");
    }

    static getInputGroupMessage() {
        return cy.get(".oxd-input-field-error-message.oxd-input-group__message");
    }

    static getForgotPasswordLink() {
        return cy.get(".orangehrm-login-forgot-header");
    }

    static getForgotPasswordTitle() {
        return cy.get(".oxd-text--h6.orangehrm-forgot-password-title");
    }

    static getResetPasswordButton() {
        return cy.get(
            ".oxd-button.orangehrm-forgot-password-button.orangehrm-forgot-password-button--reset"
        );
    }
}
