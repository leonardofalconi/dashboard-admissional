import { INotifyContext } from '~/contexts/useNotify/types'
import {
  TUseDeleteRegistrationReturn,
  TUseGetRegistrationsReturn,
  TUsePatchRegistrationReturn,
} from '~/hooks/registrations/types'

export type TNotifyParams = { title: string; message: string; status: 'success' | 'error' }

export type TNotifyErrorType = 'registrations' | 'update' | 'delete'

export type TNotifyErrorMessage = { [key in TNotifyErrorType]: { message: string } }

export type TNotifySuccessMessage = { [key in TNotifyErrorType]: { message: string } }

export type TOnInputSearchChangeParams = React.ChangeEvent<HTMLInputElement>

export interface IUseDashboardStates {
  routerProvider: {
    push: (route: string) => void
  }
  notifyProvider: INotifyContext
  getRegistrationsStates: TUseGetRegistrationsReturn
  patchRegistrationStates: TUsePatchRegistrationReturn
  deleteRegistrationStates: TUseDeleteRegistrationReturn
  hasRegistrations: boolean
}

export type TUseDashboardStates = {
  showRegistrationsLoading: boolean
  showRegistrationsError: boolean
  onNewAdmissionButtonClick: () => void
  onRegistrationsRefreshButtonClick: () => void
  onInputSearchChange: (e: TOnInputSearchChangeParams) => void
}
