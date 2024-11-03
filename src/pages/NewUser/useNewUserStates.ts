import { useForm } from 'react-hook-form'

import { ROUTES } from '~/router/routes'

import { IUseNewUserStatesFormData, TUseNewUserStates, TUseNewUserStatesReturn } from './types'

export const useNewUSerStates = ({ routerProvider }: TUseNewUserStates): TUseNewUserStatesReturn => {
  const { register, handleSubmit, formState: states, setValue } = useForm<IUseNewUserStatesFormData>()

  const goToHome = () => routerProvider.push(ROUTES.dashboard)

  const onSubmit = handleSubmit(contact => {
    console.log(contact)

    routerProvider.push(ROUTES.dashboard)
  })

  return {
    form: {
      onSubmit,
      register,
      states,
      setValue,
    },
    goToHome,
  }
}
