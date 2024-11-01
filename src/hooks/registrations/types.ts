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
