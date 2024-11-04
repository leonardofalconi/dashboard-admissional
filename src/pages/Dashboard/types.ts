export type TNotifyParams = { title: string; message: string; status: 'success' | 'error' }

export type TNotifyErrorType = 'registrations' | 'update' | 'delete'

export type TNotifyErrorMessage = { [key in TNotifyErrorType]: { message: string } }

export type TNotifySuccessMessage = { [key in TNotifyErrorType]: { message: string } }

export interface IUseDashboardStates {
  registrationsLoading: boolean
  patchRegistrationLoading: boolean
  deleteRegistrationLoading: boolean
  getRegistrationsCalled: boolean
  patchRegistrationsCalled: boolean
  deleteRegistrationsCalled: boolean
  hasRegistrations: boolean
  hasRegistrationsError: boolean
  hasPatchRegistrationError: boolean
  hasDeleteRegistrationError: boolean
  clearRegistrationsErrorState: () => void
  clearPatchErrorState: () => void
  clearDeleteErrorState: () => void
  clearRegistrationsCalledState: () => void
  clearPatchCalledState: () => void
  clearDeleteCalledState: () => void
  routerProvider: {
    push: (route: string) => void
  }
  notifyProvider: { setNotify: (params: TNotifyParams) => void }
  registrationsRefresh: () => void
}

export type TUseDashboardStates = {
  showRegistrations: boolean
  showRegistrationsLoading: boolean
  showRegistrationsError: boolean
  onNewAdmissionButtonClick: () => void
  onRegistrationsRefreshButtonClick: () => void
}
