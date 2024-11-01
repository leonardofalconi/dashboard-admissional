import { REGISTRATION } from './registrations'

export type TApi = {
  REGISTRATION: typeof REGISTRATION
}

export type TApiEndPoints = '/registrations'

export type TApiEndPointsKey = 'registrations'

export type TApiEndPointsMap = {
  [key in TApiEndPointsKey]: TApiEndPoints
}
