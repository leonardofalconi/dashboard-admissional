import { useCallback, useState } from 'react'

import {
  IUseGetRegistrationsParams,
  TGetRegistrationsFilteredFromApi,
  TGetRegistrationsFromApi,
  TUseGetRegistrationsReturn,
} from './types'

export const useGetRegistrations = ({
  registrationsProvider,
  setRegistrations,
}: IUseGetRegistrationsParams): TUseGetRegistrationsReturn => {
  const [error, setError] = useState<TUseGetRegistrationsReturn['registrationsError']>()
  const [loading, setLoading] = useState<TUseGetRegistrationsReturn['registrationsLoading']>(false)
  const [called, setCalled] = useState<TUseGetRegistrationsReturn['getRegistrationsCalled']>(false)
  const [filtering, setFiltering] = useState<TUseGetRegistrationsReturn['registrationsFiltering']>(false)

  const getRegistrationsFromApi = useCallback(
    async ({ search }: TGetRegistrationsFromApi = {}) => {
      setLoading(true)
      setCalled(true)
      setError(undefined)

      try {
        const { data } = await registrationsProvider.GET({ search })

        setRegistrations(data)
      } catch (e) {
        const error = e as Error

        console.error(error)

        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [registrationsProvider, setRegistrations],
  )

  const getRegistrationsFilteredFromApi = useCallback(
    (params: TGetRegistrationsFilteredFromApi = { filters: {} }) => {
      setFiltering(true)

      const browserQuery = new URLSearchParams()

      Object.keys(params.filters).forEach(key => params.filters[key] && browserQuery.set(key, params.filters[key]!))

      const search = browserQuery.toString()

      getRegistrationsFromApi({ search })
    },
    [getRegistrationsFromApi],
  )

  const registrationsRefresh = useCallback(() => getRegistrationsFromApi(), [getRegistrationsFromApi])

  const clearErrorState = useCallback(() => setError(undefined), [])

  const clearCalledState = useCallback(() => setCalled(false), [])

  const clearFilteringState = useCallback(() => setFiltering(false), [])

  const resetRegistrations = useCallback(() => {
    clearErrorState()
    clearCalledState()
    clearFilteringState()
    setRegistrations([])
  }, [clearCalledState, clearErrorState, clearFilteringState, setRegistrations])

  return {
    registrationsError: error,
    registrationsLoading: loading,
    registrationsFiltering: filtering,
    getRegistrationsCalled: called,
    registrationsRefresh,
    getRegistrationsFromApi,
    getRegistrationsFilteredFromApi,
    clearErrorState,
    clearCalledState,
    clearFilteringState,
    resetRegistrations,
  }
}
