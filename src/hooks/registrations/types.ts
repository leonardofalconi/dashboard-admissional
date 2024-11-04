import { TApi } from '~/api/types'
import { IContact } from '~/entities/contact'

export type TRegistrationsProviders = {
  setRegistrations: React.Dispatch<React.SetStateAction<IContact[]>>
  registrationsProvider: TApi['REGISTRATION']
}
export interface IUseGetRegistrationsParams extends TRegistrationsProviders {}

export type TClearStates = {
  clearErrorState: () => void
  clearCalledState: () => void
}

export type TGetRegistrationsFilteredFromApi = {
  filters: {
    [key: string]: string | undefined
    cpf?: string
  }
}

export type TGetRegistrationsFromApi = {
  search?: string
}

export type TUseGetRegistrationsReturn = {
  registrationsError?: Error
  registrationsLoading: boolean
  registrationsFiltering: boolean
  getRegistrationsCalled: boolean
  registrationsRefresh: () => void
  getRegistrationsFromApi: (params?: TGetRegistrationsFromApi) => void
  getRegistrationsFilteredFromApi: (params: TGetRegistrationsFilteredFromApi) => void
  clearFilteringState: () => void
  resetRegistrations: () => void
} & TClearStates

export interface IUsePatchRegistrationParams extends TRegistrationsProviders {}

export type TUsePatchRegistrationUpdateParams = { id: IContact['id']; values: Partial<Omit<IContact, 'id'>> }

export type TUsePatchRegistrationReturn = {
  patchRegistrationError?: Error
  patchRegistrationLoading: boolean
  patchRegistrationCalled: boolean
  updateRegistrationFromApi: (params: TUsePatchRegistrationUpdateParams) => void
} & TClearStates

export interface IUseDeleteRegistrationParams extends TRegistrationsProviders {}

export type TUseDeleteRegistrationRemoveParams = { id: IContact['id'] }

export type TUseDeleteRegistrationReturn = {
  deleteRegistrationError?: Error
  deleteRegistrationLoading: boolean
  deleteRegistrationCalled: boolean
  removeRegistrationFromApi: (params: TUseDeleteRegistrationRemoveParams) => void
} & TClearStates

export interface IUsePostRegistrationParams extends TRegistrationsProviders {
  hasRegistrationsCached: boolean
}

export type TUsePostRegistrationCreateParams = { contact: Omit<IContact, 'id'> }

export type TUsePostRegistrationReturn = {
  postRegistrationError?: Error
  postRegistrationLoading: boolean
  postRegistrationCalled: boolean
  createRegistrationFromApi: (params: TUsePostRegistrationCreateParams) => void
} & TClearStates
