Cypress.Commands.add("interceptLoginPageLoad", () => {
    cy.intercept("GET", "**/core/i18n/messages").as("pageLoad");
});

Cypress.Commands.add("interceptActionSummary", () => {
    cy.intercept("GET", "**/employees/action-summary", (req) => {
        req.continue((res) => {
            console.log('Intercepted action-summary response:', res);
            expect(res.statusCode).to.equal(200);
        });
    }).as("actionSummary");
});

Cypress.Commands.add("interceptShortcuts", () => {
    cy.intercept("GET", "**/shortcuts", (req) => {
        req.continue((res) => {
            expect(res.statusCode).to.equal(200);
        });
    }).as("shortcuts");
});

Cypress.Commands.add("interceptFeeds", () => {
    cy.intercept(
        "GET",
        "**/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc",
        (req) => {
            req.continue((res) => {
                expect(res.statusCode).to.equal(200);
            });
        }
    ).as("feeds");
});

Cypress.Commands.add("interceptLeaves", () => {
    cy.intercept("GET", "**/employees/leaves?date=2024-12-28", (req) => {
        req.continue((res) => {
            expect(res.statusCode).to.equal(200);
        });
    }).as("leaves");
});

Cypress.Commands.add("interceptSubunit", () => {
    cy.intercept("GET", "**/employees/subunit", (req) => {
        req.continue((res) => {
            expect(res.statusCode).to.equal(200);
        });
    }).as("subunit");
});

Cypress.Commands.add("interceptLocations", () => {
    cy.intercept("GET", "**/employees/locations", (req) => {
        req.continue((res) => {
            expect(res.statusCode).to.equal(200);
        });
    }).as("locations");
});

Cypress.Commands.add("interceptEmployess", () => {
    cy.intercept(
        "GET",
        "**/api/v2/directory/employees?limit=14&offset=0",
        (req) => {
            req.continue((res) => {
                expect(res.statusCode).to.equal(200);
            });
        }
    ).as("employees");
});
