import { TApi } from '~/api/types'
import { IContact } from '~/entities/contact'

export interface IUseGetRegistrationsParams {
  setRegistrations: React.Dispatch<React.SetStateAction<IContact[]>>
  registrationsProvider: TApi['REGISTRATION']
  hasRegistrationsCached: boolean
}

export type TUseGetRegistrationsReturn = {
  registrationsError?: Error
  registrationsLoading: boolean
  registrationsRefresh: () => void
  getRegistrationsCalled: boolean
}

export interface IUsePatchRegistrationParams {
  setRegistrations: React.Dispatch<React.SetStateAction<IContact[]>>
  registrationsProvider: TApi['REGISTRATION']
}

export type TUsePatchRegistrationUpdateParams = { id: IContact['id']; values: Partial<Omit<IContact, 'id'>> }

export type TUsePatchRegistrationReturn = {
  patchRegistrationError?: Error
  patchRegistrationLoading: boolean
  patchRegistrationCalled: boolean
  updateRegistrationFromApi: (params: TUsePatchRegistrationUpdateParams) => void
}

export interface IUseDeleteRegistrationParams {
  setRegistrations: React.Dispatch<React.SetStateAction<IContact[]>>
  registrationsProvider: TApi['REGISTRATION']
}

export type TUseDeleteRegistrationRemoveParams = { id: IContact['id'] }

export type TUseDeleteRegistrationReturn = {
  deleteRegistrationError?: Error
  deleteRegistrationLoading: boolean
  deleteRegistrationCalled: boolean
  removeRegistrationFromApi: (params: TUseDeleteRegistrationRemoveParams) => void
}

export interface IUsePostRegistrationParams {
  setRegistrations: React.Dispatch<React.SetStateAction<IContact[]>>
  registrationsProvider: TApi['REGISTRATION']
  hasRegistrationsCached: boolean
}

export type TUsePostRegistrationCreateParams = { contact: Omit<IContact, 'id'> }

export type TUsePostRegistrationReturn = {
  postRegistrationError?: Error
  postRegistrationLoading: boolean
  postRegistrationCalled: boolean
  createRegistrationFromApi: (params: TUsePostRegistrationCreateParams) => void
}
