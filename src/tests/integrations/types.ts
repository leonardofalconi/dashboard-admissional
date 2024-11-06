export type TGetFormInputsElementKey = 'employeeName' | 'email' | 'cpf' | 'admissionDate'

export type TGetFormInputsElement = { [key in TGetFormInputsElementKey]: HTMLInputElement }
