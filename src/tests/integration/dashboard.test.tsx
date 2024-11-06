import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { MOCK_CONTACTS } from '~/../__mocks__/contacts'
import { HTTP_CLIENT } from '~/clients/httpClient'
import { Header } from '~/components/Header'
import { NotifyProvider } from '~/contexts/useNotify'
import { RegistrationsProvider } from '~/contexts/useRegistrations'
import { DashboardPage } from '~/pages/Dashboard'

const mockHistory = {
  push: jest.fn(),
}

jest.mock('react-router-dom', () => ({
  useHistory: () => mockHistory,
}))

const spyOnHttpClient = jest.spyOn(HTTP_CLIENT, 'get')
const spyOnHttpClientPatch = jest.spyOn(HTTP_CLIENT, 'patch')
const spyOnHttpClientDelete = jest.spyOn(HTTP_CLIENT, 'delete')
const spyOnConsoleError = jest.spyOn(console, 'error').mockImplementation()

const MockDashboardPage = () => (
  <NotifyProvider>
    <Header>
      <h1>Caju Front Teste</h1>
    </Header>
    <RegistrationsProvider>
      <DashboardPage />
    </RegistrationsProvider>
  </NotifyProvider>
)

describe('Integration - Dashboard', () => {
  beforeEach(() => {
    spyOnHttpClient.mockReset()
    spyOnHttpClientPatch.mockReset()
    spyOnHttpClientDelete.mockReset()
    spyOnConsoleError.mockClear()
  })
  describe('Success cases', () => {
    test('should render', async () => {
      spyOnHttpClient.mockResolvedValue({ data: MOCK_CONTACTS })

      render(<MockDashboardPage />)

      const buttonGoToNewUerPageElement = screen
        .getByTestId('test-search-bar')
        .querySelector('[data-testid="test-button"]')
      const inputSearchElement = screen.getByTestId('test-search-bar').querySelector('input#search')
      const buttonRefreshElement = screen
        .getByTestId('test-search-bar')
        .querySelector('[data-testid="test-icon-button"]')

      const columnReviewElement = screen.getByTestId('test-column-review')
      const columnApprovedElement = screen.getByTestId('test-column-approved')
      const columnReprovedElement = screen.getByTestId('test-column-reproved')

      expect(buttonGoToNewUerPageElement).toBeInTheDocument()
      expect(inputSearchElement).toBeInTheDocument()
      expect(buttonRefreshElement).toBeInTheDocument()

      expect(columnReviewElement).toBeInTheDocument()
      expect(columnApprovedElement).toBeInTheDocument()
      expect(columnReprovedElement).toBeInTheDocument()

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardsReview = columnReviewElement.querySelectorAll('[data-testid="test-registration-card"]')
        const cardsApproved = columnApprovedElement.querySelectorAll('[data-testid="test-registration-card"]')
        const cardsReproved = columnReprovedElement.querySelectorAll('[data-testid="test-registration-card"]')

        expect(cardsReview.length).toBe(1)
        expect(cardsApproved.length).toBe(1)
        expect(cardsReproved.length).toBe(1)
      })
    })

    test('must approve a contact', async () => {
      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0]] })
      spyOnHttpClientPatch.mockResolvedValue({ data: { ...MOCK_CONTACTS[0], status: 'APPROVED' } })

      render(<MockDashboardPage />)

      const columnReviewElement = screen.getByTestId('test-column-review')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardReviewElement = columnReviewElement.querySelector('[data-testid="test-registration-card"]')
        const cardReviewApproveButtonElement = cardReviewElement?.querySelectorAll(
          '[data-testid="test-button"]',
        )[1] as HTMLButtonElement

        expect(cardReviewElement).toBeInTheDocument()

        fireEvent.click(cardReviewApproveButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja aprovar o(a) ${MOCK_CONTACTS[0].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientPatch).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')
      const cardApprovedElement = screen
        .getByTestId('test-column-approved')
        .querySelector('[data-testid="test-registration-card"]')

      expect(alertElement).not.toBeInTheDocument()
      expect(cardApprovedElement).toBeInTheDocument()
      expect(notifyMessageElement).toHaveTextContent('Contato alterado com sucesso.')
    })

    test('must disapprove a contact', async () => {
      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0]] })
      spyOnHttpClientPatch.mockResolvedValue({ data: { ...MOCK_CONTACTS[0], status: 'REPROVED' } })

      render(<MockDashboardPage />)

      const columnReviewElement = screen.getByTestId('test-column-review')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardReviewElement = columnReviewElement.querySelector('[data-testid="test-registration-card"]')
        const cardReviewDisapproveButtonElement = cardReviewElement?.querySelectorAll(
          '[data-testid="test-button"]',
        )[0] as HTMLButtonElement

        expect(cardReviewElement).toBeInTheDocument()

        fireEvent.click(cardReviewDisapproveButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja reprovar o(a) ${MOCK_CONTACTS[0].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientPatch).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')
      const cardDesapprovedElement = screen
        .getByTestId('test-column-reproved')
        .querySelector('[data-testid="test-registration-card"]')

      expect(alertElement).not.toBeInTheDocument()
      expect(cardDesapprovedElement).toBeInTheDocument()
      expect(notifyMessageElement).toHaveTextContent('Contato alterado com sucesso.')
    })

    test('must be sent for reanalysis', async () => {
      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[1]] })
      spyOnHttpClientPatch.mockResolvedValue({ data: { ...MOCK_CONTACTS[0], status: 'REVIEW' } })

      render(<MockDashboardPage />)

      const columnApprovedElement = screen.getByTestId('test-column-approved')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardApprovedElement = columnApprovedElement.querySelector('[data-testid="test-registration-card"]')
        const cardApprovedReviewButtonElement = cardApprovedElement?.querySelectorAll(
          '[data-testid="test-button"]',
        )[0] as HTMLButtonElement

        expect(cardApprovedElement).toBeInTheDocument()

        fireEvent.click(cardApprovedReviewButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja retornar para a revisão o(a) ${MOCK_CONTACTS[1].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientPatch).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')
      const cardReviewElement = screen
        .getByTestId('test-column-review')
        .querySelector('[data-testid="test-registration-card"]')

      expect(alertElement).not.toBeInTheDocument()
      expect(cardReviewElement).toBeInTheDocument()
      expect(notifyMessageElement).toHaveTextContent('Contato alterado com sucesso.')
    })

    test('deleting a contact', async () => {
      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0]] })
      spyOnHttpClientDelete.mockResolvedValue({ data: MOCK_CONTACTS[0] })

      render(<MockDashboardPage />)

      const columnReviewElement = screen.getByTestId('test-column-review')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardReviewElement = columnReviewElement.querySelector('[data-testid="test-registration-card"]')
        const cardReviewDeleteButtonElement = cardReviewElement?.querySelector(
          '[data-testid="test-icon-button"]',
        ) as HTMLButtonElement

        expect(cardReviewElement).toBeInTheDocument()

        fireEvent.click(cardReviewDeleteButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja deletar o(a) ${MOCK_CONTACTS[0].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientDelete).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')
      const cardReviewElement = screen
        .getByTestId('test-column-review')
        .querySelector('[data-testid="test-registration-card"]')

      expect(alertElement).not.toBeInTheDocument()
      expect(cardReviewElement).not.toBeInTheDocument()
      expect(notifyMessageElement).toHaveTextContent('Contato excluído com sucesso.')
    })

    test('navigate to new user page', async () => {
      spyOnHttpClient.mockResolvedValue({ data: [] })

      render(<MockDashboardPage />)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const buttonGoToNewUerPageElement = screen
        .getByTestId('test-search-bar')
        .querySelector('[data-testid="test-button"]') as HTMLButtonElement

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)
      expect(buttonGoToNewUerPageElement).toBeInTheDocument()

      fireEvent.click(buttonGoToNewUerPageElement)

      expect(mockHistory.push).toHaveBeenCalledTimes(1)
      expect(mockHistory.push).toHaveBeenCalledWith('/new-user')
    })

    test('registrations refresh', async () => {
      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0], MOCK_CONTACTS[1]] })

      render(<MockDashboardPage />)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const buttonRefreshElement = screen
        .getByTestId('test-search-bar')
        .querySelector('[data-testid="test-icon-button"]') as HTMLButtonElement
      const cards = screen.getAllByTestId('test-registration-card')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)
      expect(buttonRefreshElement).toBeInTheDocument()
      expect(cards.length).toBe(2)

      spyOnHttpClient.mockResolvedValue({ data: MOCK_CONTACTS })

      fireEvent.click(buttonRefreshElement)

      expect(spyOnHttpClient).toHaveBeenCalledTimes(2)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      await waitFor(() => {
        const cards = screen.getAllByTestId('test-registration-card')

        expect(cards.length).toBe(3)
      })
    })

    test('search by cpf', async () => {
      spyOnHttpClient.mockResolvedValue({ data: MOCK_CONTACTS })

      render(<MockDashboardPage />)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const inputSearchElement = screen.getByTestId('test-search-bar').querySelector('input#search') as HTMLInputElement
      let cards = screen.getAllByTestId('test-registration-card')

      expect(inputSearchElement).toBeInTheDocument()
      expect(cards.length).toBe(3)
      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[2]] })

      fireEvent.change(inputSearchElement, { target: { value: MOCK_CONTACTS[2].cpf } })

      expect(spyOnHttpClient).toHaveBeenCalledTimes(2)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      cards = screen.getAllByTestId('test-registration-card')

      expect(cards.length).toBe(1)
    })
  })

  describe('Errors cases', () => {
    test('Approve a contact', async () => {
      const mockError = new Error('An error occurred')

      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0]] })
      spyOnHttpClientPatch.mockRejectedValue(mockError)

      render(<MockDashboardPage />)

      const columnReviewElement = screen.getByTestId('test-column-review')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardReviewElement = columnReviewElement.querySelector('[data-testid="test-registration-card"]')
        const cardReviewApproveButtonElement = cardReviewElement?.querySelectorAll(
          '[data-testid="test-button"]',
        )[1] as HTMLButtonElement

        expect(cardReviewElement).toBeInTheDocument()

        fireEvent.click(cardReviewApproveButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja aprovar o(a) ${MOCK_CONTACTS[0].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientPatch).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')

      expect(notifyMessageElement).toHaveTextContent('Não foi possível alterar o status do contato.')
      expect(spyOnConsoleError).toHaveBeenCalledTimes(1)
      expect(spyOnConsoleError).toHaveBeenCalledWith(mockError)
    })

    test('must disapprove a contact', async () => {
      const mockError = new Error('An error occurred')

      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0]] })
      spyOnHttpClientPatch.mockRejectedValue(mockError)

      render(<MockDashboardPage />)

      const columnReviewElement = screen.getByTestId('test-column-review')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardReviewElement = columnReviewElement.querySelector('[data-testid="test-registration-card"]')
        const cardReviewDisapproveButtonElement = cardReviewElement?.querySelectorAll(
          '[data-testid="test-button"]',
        )[0] as HTMLButtonElement

        expect(cardReviewElement).toBeInTheDocument()

        fireEvent.click(cardReviewDisapproveButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja reprovar o(a) ${MOCK_CONTACTS[0].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientPatch).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')

      expect(notifyMessageElement).toHaveTextContent('Não foi possível alterar o status do contato.')
      expect(spyOnConsoleError).toHaveBeenCalledTimes(1)
      expect(spyOnConsoleError).toHaveBeenCalledWith(mockError)
    })

    test('must be sent for reanalysis', async () => {
      const mockError = new Error('An error occurred')

      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[1]] })
      spyOnHttpClientPatch.mockRejectedValue(mockError)

      render(<MockDashboardPage />)

      const columnApprovedElement = screen.getByTestId('test-column-approved')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardApprovedElement = columnApprovedElement.querySelector('[data-testid="test-registration-card"]')
        const cardApprovedReviewButtonElement = cardApprovedElement?.querySelectorAll(
          '[data-testid="test-button"]',
        )[0] as HTMLButtonElement

        expect(cardApprovedReviewButtonElement).toBeInTheDocument()

        fireEvent.click(cardApprovedReviewButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja retornar para a revisão o(a) ${MOCK_CONTACTS[1].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientPatch).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')

      expect(notifyMessageElement).toHaveTextContent('Não foi possível alterar o status do contato.')
      expect(spyOnConsoleError).toHaveBeenCalledTimes(1)
      expect(spyOnConsoleError).toHaveBeenCalledWith(mockError)
    })

    test('deleting a contact', async () => {
      const mockError = new Error('An error occurred')

      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0]] })
      spyOnHttpClientDelete.mockRejectedValue(mockError)

      render(<MockDashboardPage />)

      const columnReviewElement = screen.getByTestId('test-column-review')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        const cardReviewElement = columnReviewElement.querySelector('[data-testid="test-registration-card"]')
        const cardReviewDeleteButtonElement = cardReviewElement?.querySelector(
          '[data-testid="test-icon-button"]',
        ) as HTMLButtonElement

        expect(cardReviewElement).toBeInTheDocument()

        fireEvent.click(cardReviewDeleteButtonElement)
      })

      const alertElement = screen.getByTestId('test-alert')
      const alertTitleElement = screen.getByTestId('test-alert-title')
      const alertDescriptionElement = screen.getByTestId('test-alert-description')
      const alertConfirmButtonElement = screen
        .getByTestId('test-alert-actions')
        .querySelectorAll('[data-testid="test-button"]')[1] as HTMLButtonElement

      expect(alertElement).toBeInTheDocument()
      expect(alertTitleElement).toHaveTextContent('Contato')
      expect(alertDescriptionElement).toHaveTextContent(
        `Tem certeza que deseja deletar o(a) ${MOCK_CONTACTS[0].employeeName}?`,
      )

      act(() => {
        fireEvent.click(alertConfirmButtonElement)
      })

      expect(spyOnHttpClientDelete).toHaveBeenCalledTimes(1)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')

      expect(notifyMessageElement).toHaveTextContent('Não foi possível excluir o contato.')
      expect(spyOnConsoleError).toHaveBeenCalledTimes(1)
      expect(spyOnConsoleError).toHaveBeenCalledWith(mockError)
    })

    test('registrations refresh', async () => {
      const mockError = new Error('An error occurred')

      spyOnHttpClient.mockResolvedValue({ data: [MOCK_CONTACTS[0], MOCK_CONTACTS[1]] })

      render(<MockDashboardPage />)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const buttonRefreshElement = screen
        .getByTestId('test-search-bar')
        .querySelector('[data-testid="test-icon-button"]') as HTMLButtonElement
      const cards = screen.getAllByTestId('test-registration-card')

      expect(spyOnHttpClient).toHaveBeenCalledTimes(1)
      expect(buttonRefreshElement).toBeInTheDocument()
      expect(cards.length).toBe(2)

      spyOnHttpClient.mockRejectedValue(mockError)

      fireEvent.click(buttonRefreshElement)

      expect(spyOnHttpClient).toHaveBeenCalledTimes(2)

      await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

      const notifyMessageElement = screen.getByTestId('test-notify-message')

      expect(notifyMessageElement).toHaveTextContent('Não foi possível carregar os contatos.')
      expect(spyOnConsoleError).toHaveBeenCalledTimes(1)
      expect(spyOnConsoleError).toHaveBeenCalledWith(mockError)
    })
  })

  test('search by cpf', async () => {
    const mockError = new Error('An error occurred')

    spyOnHttpClient.mockResolvedValue({ data: MOCK_CONTACTS })

    render(<MockDashboardPage />)

    await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

    const inputSearchElement = screen.getByTestId('test-search-bar').querySelector('input#search') as HTMLInputElement
    const cards = screen.getAllByTestId('test-registration-card')

    expect(inputSearchElement).toBeInTheDocument()
    expect(cards.length).toBe(3)
    expect(spyOnHttpClient).toHaveBeenCalledTimes(1)

    spyOnHttpClient.mockRejectedValue(mockError)

    fireEvent.change(inputSearchElement, { target: { value: MOCK_CONTACTS[2].cpf } })

    expect(spyOnHttpClient).toHaveBeenCalledTimes(2)

    await act(async () => new Promise(resolve => setTimeout(resolve, 0)))

    const notifyMessageElement = screen.getByTestId('test-notify-message')

    expect(notifyMessageElement).toHaveTextContent('Não foi possível carregar os contatos.')
    expect(spyOnConsoleError).toHaveBeenCalledTimes(1)
    expect(spyOnConsoleError).toHaveBeenCalledWith(mockError)
  })
})
