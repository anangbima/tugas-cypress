export default class AuthPage {
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

    static verifyRedirectToRequestResetpassword() {
        cy.url().should("include", "/auth/requestPasswordResetCode");
    }

    static verifyRedirectToSendResetpassword() {
        cy.url().should("include", "/auth/sendPasswordReset");
    }
    static verifyRedirectViewDirectory() {
        cy.url().should("include", "/directory/viewDirectory");
    }

    static getUsernameInput() {
        return cy.get('input[name="username"]').should("be.visible");
    }

    static getPasswordInput() {
        return cy.get('input[name="password"]').should("be.visible");
    }

    static getLoginButton() {
        return cy
            .get(
                ".oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button"
            )
            .should("be.visible");
    }

    static getLoginTitle() {
        return cy
            .get(".oxd-text--h5.orangehrm-login-title")
            .should("have.text", "Login");
    }
    static getAlertContent() {
        return cy
            .get(".oxd-alert-content.oxd-alert-content--error")
            .should("contain.text", "Invalid credentials");
    }

    static getInputGroupMessage() {
        return cy
            .get(".oxd-input-field-error-message.oxd-input-group__message")
            .should("contain.text", "Required");
    }

    static getForgotPasswordLink() {
        return cy
            .get(".orangehrm-login-forgot-header")
            .should("be.visible")
            .should("have.text", "Forgot your password? ");
    }

    static getForgotPasswordTitle() {
        return cy
            .get(".oxd-text--h6.orangehrm-forgot-password-title")
            .should("have.text", "Reset Password link sent successfully");
    }

    static getResetPasswordButton() {
        return cy.get(
            ".oxd-button.orangehrm-forgot-password-button.orangehrm-forgot-password-button--reset"
        );
    }

    static getDropdown() {
        return cy.get(".oxd-userdropdown").should("be.visible").click();
    }

    static getLogoutLink() {
        return cy.contains(".oxd-userdropdown-link", "Logout").should("be.visible");
    }

    static clickLogout() {
        this.getLogoutLink().click();
    }
}
