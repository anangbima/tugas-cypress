export default class DirectoryPage {
    static visit() {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory"
        );
    }

    static verifyRedirectToDashboard() {
        cy.url().should("include", "/dashboard/index");
    }

    static selectDropdownOption(idx, text) {
        return cy
            .get(".oxd-select-text")
            .eq(idx)
            .click()
            .then(() => cy.contains(".oxd-select-option", text).click());
    }
    static getSearchButton() {
        return cy
            .get('.oxd-button[type="submit"]:contains("Search")')
            .should("be.visible");
    }

    static inputEmployeeName(data) {
        return cy
            .get(".oxd-autocomplete-text-input.oxd-autocomplete-text-input--active")
            .should("be.visible")
            .type(data);
    }
    static inputEmployeeNameInvalid() {
        return cy
            .contains(
                ".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message",
                "Invalid"
            )
            .should("be.visible");
    }

    static dropdownEmployee(data) {
        return cy
            .contains(".oxd-autocomplete-dropdown.--positon-bottom", data)
            .should("be.visible")
            .click();
    }
    static getRecordFoundText(data) {
        return cy
            .contains(".oxd-text.oxd-text--span", `(${data}) Record Found`)
            .should("be.visible");
    }
    static getCardUser() {
        return cy.get(
            ".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-directory-card"
        );
    }

    static verifyUserName(data) {
        return cy
            .contains(
                ".oxd-text.oxd-text--p.orangehrm-directory-card-header.--break-words",
                data
            )
            .should("be.visible");
    }
    static verifyUserJob(data) {
        return cy
            .contains(".orangehrm-directory-card-subtitle.--break-words", data)
            .should("be.visible");
    }

    static verifyUserLoc(data) {
        return cy.contains(
            ".orangehrm-directory-card-description.--break-words",
            data
        );
    }

    static verifyToastMessage() {
        cy.get("#oxd-toaster_1").should("be.visible");
        cy.contains(
            ".oxd-text.oxd-text--p.oxd-text--toast-message.oxd-toast-content-text",
            "No Records Found"
        ).should("be.visible");
    }
    static closeToast() {
        cy.get(".oxd-toast-close-container.oxd-toast-close").click();
    }
}
