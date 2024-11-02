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
