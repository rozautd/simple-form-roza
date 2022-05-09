export const typeName = (name = String) => {
    cy.get('#name').type(name)
}

export const typeEmail = (email = String) => {
    cy.get('#email').type(email)
}

export const typeSubject = (subject = String) => {
    cy.get('#subject').type(subject)
}

export const typeMessage = (message = String) => {
    cy.get('#message').type(message)
}

export const clickSubmitButton = () => {
    cy.get('button').click()
}
