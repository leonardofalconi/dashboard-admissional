import { TNotifyErrorMessage, TNotifySuccessMessage } from './types'

export const NOTIFY_ERRORS: TNotifyErrorMessage = {
  registrations: { message: 'Não foi possível carregar os contatos.' },
  update: { message: 'Não foi possível alterar o status do contato.' },
  delete: { message: 'Não foi possível excluir o contato.' },
}

export const NOTIFY_SUCCESS: TNotifySuccessMessage = {
  registrations: { message: 'Contatos carregados com sucesso.' },
  update: { message: 'Contato alterado com sucesso.' },
  delete: { message: 'Contato excluído com sucesso.' },
}
