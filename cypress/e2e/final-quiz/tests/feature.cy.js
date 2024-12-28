/// <reference types="cypress"/>
import AuthPage from "../pages/AuthPage";
import DirectoryPage from "../pages/DirectoryPage";

describe.only("Auth Feature", () => {
    beforeEach(function () {
        cy.fixture("auth_data").as("data");

        cy.interceptLoginPageLoad();
    });

    it("Should display all elements on the login page", () => {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);

        AuthPage.getLoginTitle();
        AuthPage.getUsernameInput();
        AuthPage.getPasswordInput();
        AuthPage.getLoginButton();
        AuthPage.getForgotPasswordLink();
    });

    it("Should login successfully with valid credentials", function () {
        AuthPage.visit();

        cy.wait("@pageLoad", 50000);
        cy.interceptActionSummary();
        cy.interceptShortcuts();
        cy.interceptFeeds();
        cy.interceptLeaves();
        cy.interceptSubunit();
        cy.interceptLocations();
        cy.interceptLocations();

        cy.formLogin(this.data.username, this.data.password);

        cy.wait("@actionSummary", 50000);
        cy.wait("@shortcuts", 50000);
        cy.wait("@feeds", 50000);
        cy.wait("@leaves", 50000);
        cy.wait("@subunit", 50000);
        cy.wait("@locations", 50000);
        AuthPage.verifyRedirectToDashboard();
    });

    it("Should display an error for invalid credentials", function () {
        AuthPage.visit();

        cy.wait("@pageLoad", 50000);
        cy.formLogin("invalid", "invalid");

        AuthPage.getAlertContent();
        AuthPage.verifyRedirectToLogin();
    });

    it("Should show validation error for empty username", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.formLogin("", this.data.password);
        AuthPage.getInputGroupMessage();
        AuthPage.verifyRedirectToLogin();
    });

    it("Should show validation error for empty password", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.formLogin(this.data.username, "");
        AuthPage.getInputGroupMessage();
        AuthPage.verifyRedirectToLogin();
    });

    it("Should show validation error for empty username and password", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.formLogin("", "");
        AuthPage.getInputGroupMessage();
        AuthPage.verifyRedirectToLogin();
    });

    it("Should navigate to forgot password page", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        AuthPage.getForgotPasswordLink().click();
        AuthPage.verifyRedirectToRequestResetpassword();
    });

    it("Should send reset password request with valid username", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.formForgotPassword(this.data.username);
        AuthPage.verifyRedirectToSendResetpassword();
        AuthPage.getForgotPasswordTitle();
    });

    it("Should show validation error for empty username in reset password", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.formForgotPassword("");
        AuthPage.getInputGroupMessage();
    });

    it("Should log out the user successfully", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.interceptActionSummary();
        cy.interceptShortcuts();
        cy.interceptFeeds();
        cy.interceptLeaves();
        cy.interceptSubunit();
        cy.interceptLocations();
        cy.interceptLocations();
        cy.formLogin(this.data.username, this.data.password);
        cy.wait("@actionSummary", 50000);
        cy.wait("@shortcuts", 50000);
        cy.wait("@feeds", 50000);
        cy.wait("@leaves", 50000);
        cy.wait("@subunit", 50000);
        cy.wait("@locations", 50000);
        AuthPage.verifyRedirectToDashboard();
        AuthPage.getDropdown();
        AuthPage.getLogoutLink();
        AuthPage.clickLogout();
        AuthPage.verifyRedirectToLogin();
    });
});

describe.only("Dashboard Feature", () => {
    beforeEach(function () {
        cy.fixture("auth_data").as("data");
        cy.fixture("directory_data").as("formData");
        cy.interceptLoginPageLoad();
    });

    it("Should filter search by name, job title, and location", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.interceptActionSummary();
        cy.interceptShortcuts();
        cy.interceptFeeds();
        cy.interceptLeaves();
        cy.interceptSubunit();
        cy.interceptLocations();
        cy.interceptLocations();
        cy.formLogin(this.data.username, this.data.password);
        cy.wait("@actionSummary", 50000);
        cy.wait("@shortcuts", 50000);
        cy.wait("@feeds", 50000);
        cy.wait("@leaves", 50000);
        cy.wait("@subunit", 50000);
        cy.wait("@locations", 50000);
        DirectoryPage.verifyRedirectToDashboard();
        cy.interceptEmployess();
        DirectoryPage.visit();
        cy.wait("@employees", 50000);
        DirectoryPage.inputEmployeeName(this.formData.firstName);
        DirectoryPage.dropdownEmployee(this.formData.firstName);
        DirectoryPage.selectDropdownOption(0, this.formData.job_title);
        DirectoryPage.selectDropdownOption(1, this.formData.location);
        DirectoryPage.getSearchButton().click();
        DirectoryPage.getRecordFoundText(1);
        DirectoryPage.getCardUser();
        DirectoryPage.verifyUserName(this.formData.firstName);
        DirectoryPage.verifyUserJob(this.formData.job_title);
        DirectoryPage.verifyUserLoc(this.formData.location);
    });

    it("Should display a toast message for invalid search criteria", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.interceptActionSummary();
        cy.interceptShortcuts();
        cy.interceptFeeds();
        cy.interceptLeaves();
        cy.interceptSubunit();
        cy.interceptLocations();
        cy.interceptLocations();
        cy.formLogin(this.data.username, this.data.password);
        cy.wait("@actionSummary", 50000);
        cy.wait("@shortcuts", 50000);
        cy.wait("@feeds", 50000);
        cy.wait("@leaves", 50000);
        cy.wait("@subunit", 50000);
        cy.wait("@locations", 50000);
        DirectoryPage.verifyRedirectToDashboard();
        cy.interceptEmployess();
        DirectoryPage.visit();
        cy.wait("@employees", 50000);
        DirectoryPage.inputEmployeeName(this.formData.firstName);
        DirectoryPage.dropdownEmployee(this.formData.firstName);
        DirectoryPage.selectDropdownOption(0, "Account Assistant");
        DirectoryPage.getSearchButton().click();
        DirectoryPage.verifyToastMessage();
    });

    it("Should handle invalid name in search", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.interceptActionSummary();
        cy.interceptShortcuts();
        cy.interceptFeeds();
        cy.interceptLeaves();
        cy.interceptSubunit();
        cy.interceptLocations();
        cy.interceptLocations();
        cy.formLogin(this.data.username, this.data.password);
        cy.wait("@actionSummary", 50000);
        cy.wait("@shortcuts", 50000);
        cy.wait("@feeds", 50000);
        cy.wait("@leaves", 50000);
        cy.wait("@subunit", 50000);
        cy.wait("@locations", 50000);
        DirectoryPage.verifyRedirectToDashboard();
        cy.interceptEmployess();
        DirectoryPage.visit();
        cy.wait("@employees", 50000);
        DirectoryPage.inputEmployeeName("invalid");
        DirectoryPage.getSearchButton().click();
        DirectoryPage.inputEmployeeNameInvalid();
    });

    it("Should filter search results by job title", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.interceptActionSummary();
        cy.interceptShortcuts();
        cy.interceptFeeds();
        cy.interceptLeaves();
        cy.interceptSubunit();
        cy.interceptLocations();
        cy.interceptLocations();
        cy.formLogin(this.data.username, this.data.password);
        cy.wait("@actionSummary", 50000);
        cy.wait("@shortcuts", 50000);
        cy.wait("@feeds", 50000);
        cy.wait("@leaves", 50000);
        cy.wait("@subunit", 50000);
        cy.wait("@locations", 50000);
        DirectoryPage.verifyRedirectToDashboard();
        cy.interceptEmployess();
        DirectoryPage.visit();
        cy.wait("@employees", 50000);
        DirectoryPage.selectDropdownOption(0, this.formData.job_title);
        DirectoryPage.getSearchButton().click();
    });

    it("Should filter search results by location", function () {
        AuthPage.visit();
        cy.wait("@pageLoad", 50000);
        cy.interceptActionSummary();
        cy.interceptShortcuts();
        cy.interceptFeeds();
        cy.interceptLeaves();
        cy.interceptSubunit();
        cy.interceptLocations();
        cy.interceptLocations();
        cy.formLogin(this.data.username, this.data.password);
        cy.wait("@actionSummary", 50000);
        cy.wait("@shortcuts", 50000);
        cy.wait("@feeds", 50000);
        cy.wait("@leaves", 50000);
        cy.wait("@subunit", 50000);
        cy.wait("@locations", 50000);
        DirectoryPage.verifyRedirectToDashboard();
        cy.interceptEmployess();
        DirectoryPage.visit();
        cy.wait("@employees", 50000);
        DirectoryPage.selectDropdownOption(1, this.formData.location);
        DirectoryPage.getSearchButton().click();
    });
});
