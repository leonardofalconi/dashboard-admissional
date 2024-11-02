export interface IUseDashboardStates {
  registrationsLoading: boolean
  patchRegistrationLoading: boolean
  getRegistrationsCalled: boolean
  hasRegistrations: boolean
  hasRegistrationsError: boolean
  hasPatchRegistrationError: boolean
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
