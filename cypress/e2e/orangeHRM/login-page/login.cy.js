describe('OrangeHRM Login Feature', () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('Login with valid credentials', () => {
        cy.get('[name="username"]').type('admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('Login with invalid username', () => {
        cy.get('[name="username"]').type('wronguser');
        cy.get('[name="password"]').type('admin123');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.contains('Invalid credentials').should('be.visible');
    });

    it('Login with invalid password', () => {
        cy.get('[name="username"]').type('admin');
        cy.get('[name="password"]').type('wrongpassword');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.contains('Invalid credentials').should('be.visible');
    });

    it('Login with empty fields', () => {
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('.oxd-input-field-error-message').should('contain.text', 'Required');
        cy.get('.oxd-input-field-error-message').should('contain.text', 'Required');
    });

    it('Login with empty username', () => {
        cy.get('[name="password"]').type('admin123');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('.oxd-input-field-error-message').should('contain.text', 'Required');
    });

    it('Login with empty password', () => {
        cy.get('[name="username"]').type('admin');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.get('.oxd-input-field-error-message').should('contain.text', 'Required');
    });

    it('Login with special characters in username and password', () => {
        cy.get('[name="username"]').type('!@#$%^&*');
        cy.get('[name="password"]').type('!@#$%^&*');
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.contains('Invalid credentials').should('be.visible');
    });

    it('Login with SQL injection attempt', () => {
        cy.get('[name="username"]').type("' OR '1'='1");
        cy.get('[name="password"]').type("' OR '1'='1");
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.contains('Invalid credentials').should('be.visible');
    });

    it('Verify that password input is masked', () => {
        cy.get('[name="password"]').type('admin123');
        cy.get('[name="password"]').should('have.attr', 'type', 'password');
    });
});
