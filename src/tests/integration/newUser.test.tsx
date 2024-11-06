import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { MOCK_CONTACTS } from '~/../__mocks__/contacts'
import { HTTP_CLIENT } from '~/clients/httpClient'
import { Header } from '~/components/Header'
import { NotifyProvider } from '~/contexts/useNotify'
import { RegistrationsProvider } from '~/contexts/useRegistrations'
import { NewUserPage } from '~/pages/NewUser'

import { TGetFormInputsElement, TGetFormInputsElementKey } from './types'

const mockHistory = {
  push: jest.fn(),
}

jest.mock('react-router-dom', () => ({
  useHistory: () => mockHistory,
}))

const spyOnHttpClient = jest.spyOn(HTTP_CLIENT, 'post')
const spyOnConsoleError = jest.spyOn(console, 'error').mockImplementation()

const MockNewUserPage = () => (
  <NotifyProvider>
    <Header>
      <h1>Caju Front Teste</h1>
    </Header>
    <RegistrationsProvider>
      <NewUserPage />
    </RegistrationsProvider>
  </NotifyProvider>
)

const getFormInputsElement = (): TGetFormInputsElement => ({
  employeeName: screen.getByTestId('test-new-user-form').querySelector('#employeeName')!,
  email: screen.getByTestId('test-new-user-form').querySelector('#email')!,
  cpf: screen.getByTestId('test-new-user-form').querySelector('#cpf')!,
  admissionDate: screen.getByTestId('test-new-user-form').querySelector('#admissionDate')!,
})

describe('Integration - New user', () => {
  beforeEach(() => {
    mockHistory.push.mockClear()
    spyOnHttpClient.mockReset()
  })

  describe('Success cases', () => {
    test('should render', () => {
      render(<MockNewUserPage />)

      const buttonBackElement = screen.getByTestId('test-icon-button')
      const buttonSubmitElement = screen.getByTestId('test-button')
      const formElement = screen.getByTestId('test-new-user-form')
      const formInputsElement = getFormInputsElement()

      expect(buttonBackElement).toBeInTheDocument()
      expect(buttonSubmitElement).toBeInTheDocument()
      expect(formElement).toBeInTheDocument()

      Object.keys(formInputsElement).forEach(key =>
        expect(formInputsElement[key as TGetFormInputsElementKey]).toBeInTheDocument(),
      )
    })

    test('should create a new contact', async () => {
      spyOnHttpClient.mockResolvedValue({ data: MOCK_CONTACTS[0] })

      render(<MockNewUserPage />)

      const buttonSubmitElement = screen.getByTestId('test-button')
      const formInputsElement = getFormInputsElement()

      fireEvent.focus(formInputsElement.employeeName)
      fireEvent.change(formInputsElement.employeeName, { target: { value: MOCK_CONTACTS[0].employeeName } })
      fireEvent.blur(formInputsElement.employeeName)

      fireEvent.focus(formInputsElement.email)
      fireEvent.change(formInputsElement.email, { target: { value: MOCK_CONTACTS[0].email } })
      fireEvent.blur(formInputsElement.email)

      fireEvent.focus(formInputsElement.cpf)
      fireEvent.change(formInputsElement.cpf, { target: { value: MOCK_CONTACTS[0].cpf } })
      fireEvent.blur(formInputsElement.cpf)

      fireEvent.focus(formInputsElement.admissionDate)
      fireEvent.change(formInputsElement.admissionDate, { target: { value: MOCK_CONTACTS[0].admissionDate } })
      fireEvent.blur(formInputsElement.admissionDate)

      fireEvent.click(buttonSubmitElement)

      await waitFor(async () => {
        const notifyElement = screen.getByTestId('test-notify')
        const notifyTitleElement = screen.getByTestId('test-notify-title')
        const notifyMessageElement = screen.getByTestId('test-notify-message')

        expect(notifyElement).toBeInTheDocument()
        expect(notifyTitleElement).toHaveTextContent('Cadastro')
        expect(notifyMessageElement).toHaveTextContent('Contato cadastrado com sucesso.')

        expect(mockHistory.push).toHaveBeenCalledTimes(1)
        expect(mockHistory.push).toHaveBeenCalledWith('/dashboard')
      })
    })
  })

  describe('Errors cases', () => {
    beforeEach(() => {
      spyOnConsoleError.mockClear()
    })

    test('should show an error creating a new contact', async () => {
      const mockError = new Error('An error occurred')

      spyOnHttpClient.mockRejectedValue(mockError)

      render(<MockNewUserPage />)

      const buttonSubmitElement = screen.getByTestId('test-button')
      const formInputsElement = getFormInputsElement()

      fireEvent.focus(formInputsElement.employeeName)
      fireEvent.change(formInputsElement.employeeName, { target: { value: MOCK_CONTACTS[0].employeeName } })
      fireEvent.blur(formInputsElement.employeeName)

      fireEvent.focus(formInputsElement.email)
      fireEvent.change(formInputsElement.email, { target: { value: MOCK_CONTACTS[0].email } })
      fireEvent.blur(formInputsElement.email)

      fireEvent.focus(formInputsElement.cpf)
      fireEvent.change(formInputsElement.cpf, { target: { value: MOCK_CONTACTS[0].cpf } })
      fireEvent.blur(formInputsElement.cpf)

      fireEvent.focus(formInputsElement.admissionDate)
      fireEvent.change(formInputsElement.admissionDate, { target: { value: MOCK_CONTACTS[0].admissionDate } })
      fireEvent.blur(formInputsElement.admissionDate)

      fireEvent.click(buttonSubmitElement)

      await waitFor(async () => {
        const notifyElement = screen.getByTestId('test-notify')
        const notifyTitleElement = screen.getByTestId('test-notify-title')
        const notifyMessageElement = screen.getByTestId('test-notify-message')

        expect(spyOnConsoleError).toHaveBeenCalledTimes(1)
        expect(spyOnConsoleError).toHaveBeenCalledWith(mockError)

        expect(notifyElement).toBeInTheDocument()
        expect(notifyTitleElement).toHaveTextContent('Cadastro')
        expect(notifyMessageElement).toHaveTextContent('Não foi possível cadastrar o novo contato.')

        expect(mockHistory.push).not.toHaveBeenCalled()
      })
    })

    test('form inputs required validation', async () => {
      render(<MockNewUserPage />)

      const buttonSubmitElement = screen.getByTestId('test-button')
      const formInputsElement = getFormInputsElement()

      fireEvent.click(buttonSubmitElement)

      await waitFor(async () => {
        const employeeNameErrorElement = formInputsElement.employeeName.nextElementSibling
        const emailElement = formInputsElement.email.nextElementSibling
        const cpfErrorElement = formInputsElement.cpf.nextElementSibling
        const admissionDateErrorElement = formInputsElement.admissionDate.nextElementSibling

        expect(employeeNameErrorElement).toHaveTextContent('Campo obrigatório')
        expect(emailElement).toHaveTextContent('Campo obrigatório')
        expect(cpfErrorElement).toHaveTextContent('Campo obrigatório')
        expect(admissionDateErrorElement).toHaveTextContent('Campo obrigatório')
      })
    })

    test('form inputs format validation', async () => {
      render(<MockNewUserPage />)

      const buttonSubmitElement = screen.getByTestId('test-button')
      const formInputsElement = getFormInputsElement()

      fireEvent.focus(formInputsElement.employeeName)
      fireEvent.change(formInputsElement.employeeName, { target: { value: 'Leo' } })
      fireEvent.blur(formInputsElement.employeeName)

      fireEvent.focus(formInputsElement.email)
      fireEvent.change(formInputsElement.email, { target: { value: 'leonardo@falconi' } })
      fireEvent.blur(formInputsElement.email)

      fireEvent.focus(formInputsElement.cpf)
      fireEvent.change(formInputsElement.cpf, { target: { value: '123123123' } })
      fireEvent.blur(formInputsElement.cpf)

      fireEvent.click(buttonSubmitElement)

      await waitFor(async () => {
        const employeeNameErrorElement = formInputsElement.employeeName.nextElementSibling
        const emailElement = formInputsElement.email.nextElementSibling
        const cpfErrorElement = formInputsElement.cpf.nextElementSibling

        expect(employeeNameErrorElement).toHaveTextContent('Inserir de acordo com o exemplo: Leonardo Falconi')
        expect(emailElement).toHaveTextContent('Inserir de acordo com o exemplo: exemplo@caju.com')
        expect(cpfErrorElement).toHaveTextContent('Digitar apenas números e 11 digitos')
      })
    })
  })
})
