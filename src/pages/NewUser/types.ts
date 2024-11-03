import { BaseSyntheticEvent } from 'react'
import { FormState, UseFormRegister, UseFormSetValue, ValidationRule } from 'react-hook-form'

import { IContact } from '~/entities/contact'

export type IUseNewUserStatesFormData = Omit<IContact, 'status' | 'id'>

export type TUseNewUserStatesSubmitCallbackParams = { contact: Omit<IContact, 'id'> }

export type TUseNewUserStatesHandleSubmitParams = IUseNewUserStatesFormData

export type TUseNewUserStates = {
  routerProvider: {
    push: (route: string) => void
  }
  notifyProvider: { setNotify: (params: { title: string; message: string; status: 'success' | 'error' }) => void }
  formSubmitCallback: (params: TUseNewUserStatesSubmitCallbackParams) => void
  postRegistrationLoading: boolean
  postRegistrationCalled: boolean
  hasPostRegistrationError: boolean
  postClearErrorState: () => void
  postClearCalledState: () => void
}

export type TUseNewUserStatesReturn = {
  form: {
    onSubmit: (event: BaseSyntheticEvent<object, any, any>) => void
    register: UseFormRegister<IUseNewUserStatesFormData>
    states: FormState<IUseNewUserStatesFormData>
    setValue: UseFormSetValue<IUseNewUserStatesFormData>
  }
  onPrevButtonClick: () => void
  showPostRegistrationLoading: boolean
  showPostRegistrationError: boolean
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
