import { TFormMask } from './types'

const cpf = ({ value }: TFormMask) => {
  let newValue = value.replace(/\D/g, '')

  if (value.length <= 11) {
    newValue = newValue.replace(/(\d{3})(\d)/, '$1.$2')
    newValue = newValue.replace(/(\d{3})(\d)/, '$1.$2')
    newValue = newValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  return newValue
}

export const formMask = {
  cpf,
}
