import { MOCK_CONTACTS } from '../constants/contacts'
import { alertAction } from '../utils/alert'
import { clearMockedContactsFromRegistrationsDbTable } from '../utils/common'
import {
  contactApprove,
  contactDelete,
  contactDisapprove,
  contactFromApproveToReview,
  contactFromReprovedToReview,
  contactsCountValidation,
  createNewContact,
  navigateToNewUser,
  notifyValidation,
  registrationsRefresh,
  searchByCpf,
  typeInputCpf,
  typeInputEmail,
  typeInputEmployeeName,
} from '../utils/registrations'

describe('Registrations', () => {
  // Remove all mocked contacts from db
  afterEach(() => {
    cy.visit('/')
      .wait(1000)
      .then(() => {
        clearMockedContactsFromRegistrationsDbTable({ contacts: MOCK_CONTACTS })
      })
  })

  describe('Success cases', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('1 - Create a new contact', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      notifyValidation({ action: 'post', status: 'success' })
    })

    it('2 - Approve the new contact, return it for review, disapprove the same contact, and return it for review again', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      contactApprove({ name: MOCK_CONTACTS[0].name })

      notifyValidation({ action: 'update', status: 'success' })

      contactFromApproveToReview({ name: MOCK_CONTACTS[0].name })

      notifyValidation({ action: 'update', status: 'success' })

      contactDisapprove({ name: MOCK_CONTACTS[0].name })

      notifyValidation({ action: 'update', status: 'success' })

      contactFromReprovedToReview({ name: MOCK_CONTACTS[0].name })

      notifyValidation({ action: 'update', status: 'success' })
    })

    it('3 - Filter by CPF, and apply the same validation as in step 2 with the filtered contact', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[1])

      searchByCpf({ cpf: MOCK_CONTACTS[1].cpf })

      contactApprove({ name: MOCK_CONTACTS[1].name })

      contactFromApproveToReview({ name: MOCK_CONTACTS[1].name })

      contactDisapprove({ name: MOCK_CONTACTS[1].name })

      contactFromReprovedToReview({ name: MOCK_CONTACTS[1].name })
    })

    it('4 - Filter by CPF and apply refresh to view all contacts', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[1])

      searchByCpf({ cpf: MOCK_CONTACTS[0].cpf })

      contactsCountValidation({ qty: 1 })

      registrationsRefresh()

      contactsCountValidation({ qty: 2 })
    })

    it('5 - Cancel the approval, disapproval, and review of the contact', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[1])

      contactApprove({ name: MOCK_CONTACTS[1].name, alertActionOption: 'cancel' })

      contactDisapprove({ name: MOCK_CONTACTS[1].name, alertActionOption: 'cancel' })

      contactApprove({ name: MOCK_CONTACTS[1].name })

      contactFromApproveToReview({ name: MOCK_CONTACTS[1].name, alertActionOption: 'cancel' })

      contactFromApproveToReview({ name: MOCK_CONTACTS[1].name })

      contactDisapprove({ name: MOCK_CONTACTS[1].name })

      contactFromReprovedToReview({ name: MOCK_CONTACTS[1].name, alertActionOption: 'cancel' })

      contactFromReprovedToReview({ name: MOCK_CONTACTS[1].name })
    })

    it('6 - Delete a contact from review, approved and reproved', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[2])

      contactDelete({ name: MOCK_CONTACTS[2].name, column: 'review' })

      notifyValidation({ action: 'delete', status: 'success' })

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[2])

      contactApprove({ name: MOCK_CONTACTS[2].name })

      contactDelete({ name: MOCK_CONTACTS[2].name, column: 'approved' })

      notifyValidation({ action: 'delete', status: 'success' })

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[2])

      contactDisapprove({ name: MOCK_CONTACTS[2].name })

      contactDelete({ name: MOCK_CONTACTS[2].name, column: 'reproved' })

      notifyValidation({ action: 'delete', status: 'success' })
    })

    it('7 - Cancel the deletion of a contact under review, approved, and disapproved', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[2])

      contactDelete({ name: MOCK_CONTACTS[2].name, column: 'review', alertActionOption: 'cancel' })

      contactApprove({ name: MOCK_CONTACTS[2].name })

      contactDelete({ name: MOCK_CONTACTS[2].name, column: 'approved', alertActionOption: 'cancel' })

      contactFromApproveToReview({ name: MOCK_CONTACTS[2].name })

      contactDisapprove({ name: MOCK_CONTACTS[2].name })

      contactDelete({ name: MOCK_CONTACTS[2].name, column: 'reproved', alertActionOption: 'cancel' })

      contactFromReprovedToReview({ name: MOCK_CONTACTS[2].name })
    })

    it('8 - Form validations', () => {
      navigateToNewUser()

      cy.get('[data-testid="test-new-user-form"] [data-testid="test-button"]').click()

      cy.get('[data-testid="test-new-user-form"]').should('exist')

      cy.get('input#employeeName').next('span').should('have.text', 'Campo obrigatório')
      cy.get('input#email').next('span').should('have.text', 'Campo obrigatório')
      cy.get('input#cpf').next('span').should('have.text', 'Campo obrigatório')
      cy.get('input#admissionDate').next('span').should('have.text', 'Campo obrigatório')

      typeInputEmployeeName({ name: 'Leonardo' })
      typeInputEmail({ email: 'leonardo@com' })
      typeInputCpf({ cpf: '123123' })

      cy.get('[data-testid="test-new-user-form"] [data-testid="test-button"]').click()

      cy.get('[data-testid="test-new-user-form"]').should('exist')

      cy.get('input#employeeName').next('span').should('have.text', 'Inserir de acordo com o exemplo: Leonardo Falconi')
      cy.get('input#email').next('span').should('have.text', 'Inserir de acordo com o exemplo: exemplo@caju.com')
      cy.get('input#cpf').next('span').should('have.text', 'Digitar apenas números e 11 digitos')
    })

    it('9 - it should be possible to create a new contact while is filtering by cpf and see the new contact in the list', () => {
      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[1])

      contactsCountValidation({ qty: 2 })

      searchByCpf({ cpf: MOCK_CONTACTS[0].cpf })

      contactsCountValidation({ qty: 1 })

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[2])

      contactsCountValidation({ qty: 3 })
    })
  })

  describe('Error cases', () => {
    // Rollback api interceptions
    afterEach(() => {
      cy.intercept('GET', 'http://localhost:3000/registrations*', req => {
        req.continue()
      })
    })

    it('1 - Contact listing', () => {
      cy.intercept('GET', 'http://localhost:3000/registrations', req => {
        req.reply({
          statusCode: 500,
        })
      })

      cy.visit('/')

      notifyValidation({ action: 'registrations', status: 'error' })
    })

    it('2 - Create a new contact', () => {
      cy.intercept('POST', 'http://localhost:3000/registrations', req => {
        req.reply({
          statusCode: 500,
        })
      })

      cy.visit('/')

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      notifyValidation({ action: 'post', status: 'error' })
    })

    it('3 - Approve, disapprove, review and delete the contact', () => {
      cy.intercept('PATCH', 'http://localhost:3000/registrations/*', req => {
        req.reply({
          statusCode: 500,
        })
      })

      cy.visit('/')

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      contactApprove({ name: MOCK_CONTACTS[0].name, withError: true })

      notifyValidation({ action: 'update', status: 'error' })

      alertAction({ action: 'cancel' })

      contactDisapprove({ name: MOCK_CONTACTS[0].name, withError: true })

      notifyValidation({ action: 'update', status: 'error' })

      alertAction({ action: 'cancel' })

      cy.intercept('PATCH', 'http://localhost:3000/registrations/*', req => {
        req.continue()
      })

      contactApprove({ name: MOCK_CONTACTS[0].name })

      cy.intercept('PATCH', 'http://localhost:3000/registrations/*', req => {
        req.reply({
          statusCode: 500,
        })
      })

      contactFromApproveToReview({ name: MOCK_CONTACTS[0].name, withError: true })

      notifyValidation({ action: 'update', status: 'error' })

      alertAction({ action: 'cancel' })

      cy.intercept('DELETE', 'http://localhost:3000/registrations/*', req => {
        req.reply({
          statusCode: 500,
        })
      })

      contactDelete({ name: MOCK_CONTACTS[0].name, column: 'approved', withError: true })

      notifyValidation({ action: 'delete', status: 'error' })

      alertAction({ action: 'cancel' })
    })

    it('4 - Filter by CPF', () => {
      cy.intercept('GET', 'http://localhost:3000/registrations?*', req => {
        req.reply({
          statusCode: 500,
        })
      })

      cy.visit('/')

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      searchByCpf({ cpf: MOCK_CONTACTS[0].cpf })

      notifyValidation({ action: 'registrations', status: 'error' })
    })

    it('5 - Refresh the contact listing', () => {
      cy.visit('/')

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[0])

      navigateToNewUser()

      createNewContact(MOCK_CONTACTS[1])

      searchByCpf({ cpf: MOCK_CONTACTS[0].cpf })

      cy.intercept('GET', 'http://localhost:3000/registrations', req => {
        req.reply({
          statusCode: 500,
        })
      })

      registrationsRefresh()

      notifyValidation({ action: 'registrations', status: 'error' })
    })
  })
})
