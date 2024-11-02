import { useCallback, useState } from 'react'

import { IUsePostRegistrationParams, TUsePostRegistrationCreateParams, TUsePostRegistrationReturn } from './types'

export const usePostRegistration = ({
  registrationsProvider,
  setRegistrations,
  hasRegistrationsCached,
}: IUsePostRegistrationParams): TUsePostRegistrationReturn => {
  const [error, setError] = useState<TUsePostRegistrationReturn['postRegistrationError']>()
  const [loading, setLoading] = useState<TUsePostRegistrationReturn['postRegistrationLoading']>(false)
  const [called, setCalled] = useState<TUsePostRegistrationReturn['postRegistrationCalled']>(false)

  const createRegistrationFromApi = useCallback(
    async ({ contact }: TUsePostRegistrationCreateParams) => {
      setLoading(true)
      setCalled(true)
      setError(undefined)

      try {
        const { data } = await registrationsProvider.POST(contact)

        if (!hasRegistrationsCached) return

        setRegistrations(current => [...current, data])
      } catch (e) {
        const error = e as Error

        console.error(error)

        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [registrationsProvider, setRegistrations, hasRegistrationsCached],
  )

  return {
    postRegistrationError: error,
    postRegistrationLoading: loading,
    postRegistrationCalled: called,
    createRegistrationFromApi,
  }
}
