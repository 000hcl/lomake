/* eslint-disable no-undef */
/// <reference types="cypress" />

import { setHeaders } from '../../config/mockHeaders'

/**
 * Logs in as specified user.
 * @param {string} uid Uid of user to login as
 */
Cypress.Commands.add('login', uid => {
  setHeaders(uid)
  cy.log('Logged in as', uid)
})

/**
 * Writes text to custom editor used in form.
 * Can be used to "paste" long texts.
 */
Cypress.Commands.add('copyToTextField', (editorName, textToBeTyped) => {
  cy.get(editorName)
    .find('.editor-class')
    .find('.DraftEditor-root')
    .find('.DraftEditor-editorContainer')
    .find('.public-DraftEditor-content')
    .then(input => {
      const textarea = input.get(0)
      textarea.dispatchEvent(new Event('focus'))

      const textEvent = document.createEvent('TextEvent')
      textEvent.initTextEvent('textInput', true, true, null, textToBeTyped)
      textarea.dispatchEvent(textEvent)

      textarea.dispatchEvent(new Event('blur'))
    })
})

Cypress.Commands.add('writeToTextField', (editorName, textToBeTyped) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.get(editorName).click().type(`{moveToEnd}${textToBeTyped}`)
})

Cypress.Commands.add('getEditorInputLength', editorName => {
  cy.get(editorName)
    .find('.editor-class')
    .find('.DraftEditor-root')
    .find('.DraftEditor-editorContainer')
    .find('.public-DraftEditor-content')
    .then(input => {
      const textarea = input.get(0)
      return textarea.textContent.length
    })
})

Cypress.Commands.add('getYearSelector', () => {
  const currentDate = new Date()
  cy.get('[data-cy=yearSelector]').click()
  cy.get('[data-cy=yearSelector]').then(newEl => {
    expect(newEl.find('.item')).to.have.length(currentDate.getFullYear() - 2018)
  })
})

Cypress.Commands.add('selectYear', year => {
  const currentDate = new Date()
  cy.get('[data-cy=yearSelector]').click()
  cy.get('[data-cy=yearSelector]').then(newEl => {
    expect(newEl.find('.item')).to.have.length(currentDate.getFullYear() - 2018)
  })
  cy.get('[data-cy=yearSelector]').contains(year).click()
})

Cypress.Commands.add('hasAccess', (uid, programCode, access) => {
  cy.login('cypressToskaUser')
  cy.visit('/')
  cy.get(`[data-cy=${programCode}-manage]`).click()
  cy.get(`[data-cy=read-${uid}${access.read ? '' : '-false'}]`)
  cy.get(`[data-cy=write-${uid}${access.write ? '' : '-false'}]`)
  cy.get(`[data-cy=admin-${uid}${access.admin ? '' : '-false'}]`)
})

Cypress.Commands.add('hasSpecialGroups', (uid, ...specialGroup) => {
  cy.login('cypressToskaUser')
  cy.visit('/admin')
  specialGroup.forEach(sg => {
    cy.get('[data-cy^=user-access-groups]').contains(sg)
  })
})
