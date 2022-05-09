// Your tests go in here. Happy coding! 🤓 -> THANKS ;)
import testUrl from 'cypress.json'
import testData from '../fixtures/testData.json'
import errorJson from '../fixtures/error.json'
import successfulJson from '../fixtures/successful.json'
import {
    typeName,
    typeEmail,
    typeSubject,
    typeMessage,
    clickSubmitButton,
} from '../support/robots/FormRobot'

describe('Simple form integration test for happy/unhappy path', () => {
    beforeEach(() => {
        cy.visit(testUrl.baseUrl)

        typeName(testData.form.name)
        typeEmail(testData.form.email)
        typeSubject(testData.form.subject)
        typeMessage(testData.form.message)
    })
    it('Happy path', () => {
        cy.intercept('POST', 'https://api.livechatinc.com/v2/tickets/new', {
            fixture: 'successful.json',
            statusCode: 200,
        }).as('post')

        clickSubmitButton()

        cy.wait('@post').its('response.statusCode').should('eq', 200)
        cy.get('.success').should('have.text', testData.text.success)
        cy.get('@post')
            .its('response')
            .then((res) => {
                expect(res.body, 'response body').to.deep.equal({
                    id: successfulJson.id,
                })
            })
    })
    it('Unhappy path', () => {
        cy.intercept('POST', 'https://api.livechatinc.com/v2/tickets/new', {
            fixture: 'error.json',
            statusCode: 500,
        }).as('post')

        clickSubmitButton()

        cy.wait('@post').its('response.statusCode').should('eq', 500)
        cy.get('.fail').should('have.text', testData.text.error)
        cy.get('@post')
            .its('response')
            .then((res) => {
                expect(res.body, 'response body').to.deep.equal({
                    error: errorJson.error,
                })
            })
    })
})
