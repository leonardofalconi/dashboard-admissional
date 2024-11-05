import { MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP } from '../constants/registrations'
import { TCreateNewContactParams } from '../types/contacts'
import { alertAction } from './alert'

export const clearMockedContactsFromRegistrationsDbTable = ({ contacts }: { contacts: TCreateNewContactParams[] }) => {
  let currentIndex: number
  let registrationsCard: NodeListOf<Element>

  const deleteCard = () => {
    if (currentIndex === -1 || !registrationsCard?.length) return

    const card = registrationsCard[currentIndex]
    const contact = contacts.find(contact => contact.name !== card.getAttribute('data-test-employee-name'))

    if (!contact) {
      currentIndex--

      deleteCard()

      return
    }

    const deleteButton = card.querySelector(MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP.delete) as HTMLButtonElement

    deleteButton.click()

    alertAction({ action: 'confirm' })

    cy.wait(1000).then(() => {
      currentIndex--

      deleteCard()
    })
  }

  cy.get(`[data-testid="test-dashboard-page"]`).then(elementDom => {
    const dashboard = elementDom[0]

    registrationsCard = dashboard.querySelectorAll('[data-testid="test-registration-card"]')

    if (!registrationsCard.length) return

    currentIndex = registrationsCard.length - 1

    deleteCard()
  })
}
