export interface IUseDashboardStates {
  registrationsLoading: boolean
  getRegistrationsCalled: boolean
  hasRegistrations: boolean
  hasRegistrationsError?: boolean
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
