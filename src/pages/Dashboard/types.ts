export interface IUseDashboardStates {
  registrationsLoading: boolean
  patchRegistrationLoading: boolean
  deleteRegistrationLoading: boolean
  getRegistrationsCalled: boolean
  hasRegistrations: boolean
  hasRegistrationsError: boolean
  hasPatchRegistrationError: boolean
  hasDeleteRegistrationError: boolean
  routerProvider: {
    push: (route: string) => void
  }
}

export type TUseDashboardStates = {
  showRegistrations: boolean
  showRegistrationsLoading: boolean
  showRegistrationsError: boolean
  onNewAdmissionButtonClick: () => void
}
