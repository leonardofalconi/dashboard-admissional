import { useCallback, useEffect, useState } from 'react'

import { IUseGetRegistrationsParams, TUseGetRegistrationsReturn } from './types'

export const useGetRegistrations = ({
  registrationsProvider,
  setRegistrations,
  hasRegistrationsCached,
}: IUseGetRegistrationsParams): TUseGetRegistrationsReturn => {
  const [error, setError] = useState<TUseGetRegistrationsReturn['registrationsError']>()
  const [loading, setLoading] = useState<TUseGetRegistrationsReturn['registrationsLoading']>(false)
  const [called, setCalled] = useState<TUseGetRegistrationsReturn['getRegistrationsCalled']>(false)

  const getRegistrationsFromApi = useCallback(async () => {
    setLoading(true)
    setCalled(true)
    setError(undefined)

    try {
      const { data } = await registrationsProvider.GET()

      setRegistrations(data)
    } catch (e) {
      const error = e as Error

      console.error(error)

      setError(error)
    } finally {
      setLoading(false)
    }
  }, [registrationsProvider, setRegistrations])

  const registrationsRefresh = () => getRegistrationsFromApi()

  useEffect(() => {
    if (hasRegistrationsCached) return

    getRegistrationsFromApi()
  }, [getRegistrationsFromApi, hasRegistrationsCached])

  const clearErrorState = useCallback(() => setError(undefined), [])

  const clearCalledState = useCallback(() => setCalled(false), [])

  return {
    registrationsError: error,
    registrationsLoading: loading,
    getRegistrationsCalled: called,
    registrationsRefresh,
    clearErrorState,
    clearCalledState,
  }
}
