import { TUseNewUserFormField } from './types'

export const FORM_FIELDS: TUseNewUserFormField[] = [
  {
    id: 'name',
    placeholder: 'Nome',
    label: 'Nome',
    required: true,
    type: 'text',
    pattern: /^(?! )[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+(?<! )$/,
    messages: {
      required: 'Campo obrigatório',
      pattern: 'Inserir de acordo com o exemplo: Leonardo Falconi',
    },
  },
  {
    id: 'email',
    placeholder: 'E-mail',
    label: 'E-mail',
    required: true,
    type: 'text',
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    messages: {
      required: 'Campo obrigatório',
      pattern: 'Inserir de acordo com o exemplo: exemplo@caju.com',
    },
  },
  {
    id: 'cpf',
    placeholder: 'CPF',
    label: 'CPF',
    required: true,
    type: 'text',
    mask: 'cpf',
    maxLength: 14,
    pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    messages: {
      required: 'Campo obrigatório',
      pattern: 'Digitar apenas números e 11 digitos',
    },
  },
  {
    id: 'admissionDate',
    label: 'Data de admissão',
    required: true,
    type: 'date',
    messages: {
      required: 'Campo obrigatório',
      pattern: 'Inserir de acordo com o exemplo: dd/mm/aaaa',
    },
  },
]
