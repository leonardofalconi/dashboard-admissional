import {
  MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP,
  MOCK_REGISTRATIONS_COLUMNS_MAP,
  NOTIFY_ERRORS,
  NOTIFY_SUCCESS,
} from '../constants/registrations'
import { TAlertActionsButton } from '../types/alert'
import { TCreateNewContactParams } from '../types/contacts'
import { TNotifyMessageType, TRegistrationColumn } from '../types/registrations'
import { alertAction } from './alert'

export const typeInputEmployeeName = ({ name }: Pick<TCreateNewContactParams, 'name'>) =>
  cy.get('input#employeeName').type(name)
export const typeInputEmail = ({ email }: Pick<TCreateNewContactParams, 'email'>) => cy.get('input#email').type(email)
export const typeInputCpf = ({ cpf }: Pick<TCreateNewContactParams, 'cpf'>) => cy.get('input#cpf').type(cpf)
export const typeInputAdmissionDate = ({ date }: Pick<TCreateNewContactParams, 'date'>) =>
  cy.get('input#admissionDate').type(date)

export const createNewContact = ({ name, email, cpf, date }: TCreateNewContactParams) => {
  typeInputEmployeeName({ name })
  typeInputEmail({ email })
  typeInputCpf({ cpf })
  typeInputAdmissionDate({ date })

  cy.get('[data-testid="test-new-user-form"] [data-testid="test-button"]').click()
}

export const contactFromApproveToReview = ({
  name,
  alertActionOption = 'confirm',
  withError,
}: {
  name: string
  alertActionOption?: TAlertActionsButton
  withError?: boolean
}) => {
  const columnSelectorApproved = MOCK_REGISTRATIONS_COLUMNS_MAP.approved
  const cardSelector = `[data-testid="test-registration-card"][data-test-employee-name="${name}"] [data-testid="test-registration-card-actions"]`
  const cardReviewButtonSelector = `${columnSelectorApproved} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.review}`

  cy.get(cardReviewButtonSelector).should('have.text', 'Revisar novamente')
  cy.get(cardReviewButtonSelector).click()

  alertAction({ action: alertActionOption })

  if (alertActionOption === 'cancel' || withError) {
    cy.get(cardReviewButtonSelector).should('have.text', 'Revisar novamente')

    return
  }

  const columnSelectorReview = MOCK_REGISTRATIONS_COLUMNS_MAP.review

  cy.get(`${columnSelectorReview} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.approve}`).should(
    'have.text',
    'Aprovar',
  )
}

export const contactFromReprovedToReview = ({
  name,
  alertActionOption = 'confirm',
  withError,
}: {
  name: string
  alertActionOption?: TAlertActionsButton
  withError?: boolean
}) => {
  const columnSelectorReproved = MOCK_REGISTRATIONS_COLUMNS_MAP.reproved
  const cardSelector = `[data-testid="test-registration-card"][data-test-employee-name="${name}"] [data-testid="test-registration-card-actions"]`
  const cardReviewButtonSelector = `${columnSelectorReproved} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.review}`

  cy.get(cardReviewButtonSelector).should('have.text', 'Revisar novamente')
  cy.get(cardReviewButtonSelector).click()

  alertAction({ action: alertActionOption })

  if (alertActionOption === 'cancel' || withError) {
    cy.get(cardReviewButtonSelector).should('have.text', 'Revisar novamente')

    return
  }

  const columnSelectorReview = MOCK_REGISTRATIONS_COLUMNS_MAP.review

  cy.get(`${columnSelectorReview} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.disapprove}`).should(
    'have.text',
    'Reprovar',
  )
}

export const contactApprove = ({
  name,
  alertActionOption = 'confirm',
  withError,
}: {
  name: string
  alertActionOption?: TAlertActionsButton
  withError?: boolean
}) => {
  const columnSelectorReview = MOCK_REGISTRATIONS_COLUMNS_MAP.review
  const cardSelector = `[data-testid="test-registration-card"][data-test-employee-name="${name}"] [data-testid="test-registration-card-actions"]`
  const cardApproveButtonSelector = `${columnSelectorReview} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.approve}`

  cy.get(cardApproveButtonSelector).should('have.text', 'Aprovar')
  cy.get(cardApproveButtonSelector).click()

  alertAction({ action: alertActionOption })

  if (alertActionOption === 'cancel' || withError) {
    cy.get(cardApproveButtonSelector).should('have.text', 'Aprovar')

    return
  }

  const columnSelectorApproved = MOCK_REGISTRATIONS_COLUMNS_MAP.approved

  cy.get(`${columnSelectorApproved} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.review}`).should(
    'have.text',
    'Revisar novamente',
  )
}

export const contactDisapprove = ({
  name,
  alertActionOption = 'confirm',
  withError,
}: {
  name: string
  alertActionOption?: TAlertActionsButton
  withError?: boolean
}) => {
  const columnSelectorReview = MOCK_REGISTRATIONS_COLUMNS_MAP.review
  const cardSelector = `[data-testid="test-registration-card"][data-test-employee-name="${name}"] [data-testid="test-registration-card-actions"]`
  const cardDisapproveButtonSelector = `${columnSelectorReview} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.disapprove}`

  cy.get(cardDisapproveButtonSelector).should('have.text', 'Reprovar')
  cy.get(cardDisapproveButtonSelector).click()

  alertAction({ action: alertActionOption })

  if (alertActionOption === 'cancel' || withError) {
    cy.get(cardDisapproveButtonSelector).should('have.text', 'Reprovar')

    return
  }

  const columnSelectorDisapprove = MOCK_REGISTRATIONS_COLUMNS_MAP.reproved

  cy.get(`${columnSelectorDisapprove} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.review}`).should(
    'have.text',
    'Revisar novamente',
  )
}

export const navigateToNewUser = () => {
  cy.get('[data-testid="test-search-bar"] [data-testid="test-button"]').click()
}

export const searchByCpf = ({ cpf }: { cpf: string }) => {
  cy.get('[data-testid="test-search-bar"] input#search').type(cpf)
}

export const registrationsRefresh = () => {
  cy.get('[data-testid="test-search-bar"] [data-testid="test-icon-button"]').click()
}

export const contactsCountValidation = ({ qty, condition = 'gte' }: { qty: number; condition?: 'gte' }) => {
  cy.get('[data-testid="test-registration-card"]').should(`have.length.${condition}`, qty)
}

export const contactDelete = ({
  name,
  column,
  alertActionOption = 'confirm',
  withError,
}: {
  name: string
  column: TRegistrationColumn
  alertActionOption?: TAlertActionsButton
  withError?: boolean
}) => {
  const columnSelector = MOCK_REGISTRATIONS_COLUMNS_MAP[column]
  const cardSelector = `[data-testid="test-registration-card"][data-test-employee-name="${name}"] [data-testid="test-registration-card-actions"]`
  const cardDeleteButtonSelector = `${columnSelector} ${cardSelector} ${MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.delete}`

  cy.get(cardDeleteButtonSelector).click()

  alertAction({ action: alertActionOption })

  if (alertActionOption === 'cancel' || withError) {
    cy.get(cardSelector).should('exist')

    return
  }

  cy.get(cardSelector).should('not.exist')
}

export const notifyValidation = ({ status, action }: { status: 'error' | 'success'; action: TNotifyMessageType }) => {
  const messagesMap = status === 'error' ? NOTIFY_ERRORS : NOTIFY_SUCCESS
  const { message } = messagesMap[action]

  cy.get('[data-testid="test-notify"] [data-testid="test-notify-message"]').should('have.text', message)
}
