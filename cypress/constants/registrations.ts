import {
  TNotifyErrorMessage,
  TNotifySuccessMessage,
  TRegistrationCardActionsButtonMap,
  TRegistrationColumnsMap,
} from '../types/registrations'

export const MOCK_REGISTRATIONS_CARD_ACTIONS_BUTTON_MAP: TRegistrationCardActionsButtonMap = {
  disapprove: 'button:nth(0)',
  approve: 'button:nth(1)',
  review: 'button:nth(0)',
  delete: 'button[data-testid="test-icon-button"]',
}

export const MOCK_REGISTRATIONS_COLUMNS_MAP: TRegistrationColumnsMap = {
  review: '[data-testid="test-column-review"]',
  approved: '[data-testid="test-column-approved"]',
  reproved: '[data-testid="test-column-reproved"]',
}

export const NOTIFY_ERRORS: TNotifyErrorMessage = {
  registrations: { message: 'Não foi possível carregar os contatos.' },
  update: { message: 'Não foi possível alterar o status do contato.' },
  delete: { message: 'Não foi possível excluir o contato.' },
  post: { message: 'Não foi possível cadastrar o novo contato.' },
}

export const NOTIFY_SUCCESS: TNotifySuccessMessage = {
  registrations: { message: 'Contatos carregados com sucesso.' },
  update: { message: 'Contato alterado com sucesso.' },
  delete: { message: 'Contato excluído com sucesso.' },
  post: { message: 'Contato cadastrado com sucesso.' },
}
