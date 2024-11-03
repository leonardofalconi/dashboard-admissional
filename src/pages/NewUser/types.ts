import { FormState, UseFormRegister, UseFormSetValue, ValidationRule } from 'react-hook-form'

export type IUseNewUserStatesFormData = {
  name: string
  email: string
  cpf: string
  admissionDate: string
}

export type TUseNewUserStates = {
  routerProvider: {
    push: (route: string) => void
  }
}

export type TUseNewUserStatesReturn = {
  form: {
    onSubmit: () => void
    register: UseFormRegister<IUseNewUserStatesFormData>
    states: FormState<IUseNewUserStatesFormData>
    setValue: UseFormSetValue<IUseNewUserStatesFormData>
  }
  goToHome: () => void
}

export type TUseNewUserFormField = {
  id: keyof IUseNewUserStatesFormData
  placeholder?: string
  label: string
  required?: boolean
  pattern?: ValidationRule<RegExp>
  mask?: 'cpf'
  maxLength?: number
  type?: 'text' | 'date'
  messages: {
    [key: string]: string | undefined
    required: string
    pattern?: string
  }
}
