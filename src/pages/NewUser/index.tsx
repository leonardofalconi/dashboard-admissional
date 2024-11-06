import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

import { API } from '~/api'
import { IconButton } from '~/components/IconButton'
import { Loading } from '~/components/Loading'
import { TextField } from '~/components/TextField'
import { useNotifyContext } from '~/contexts/useNotify'
import { useRegistrationsContext } from '~/contexts/useRegistrations'
import { usePostRegistration } from '~/hooks/registrations/usePostRegistration'
import { formMask } from '~/utils/form'

import * as Styled from './styles'
import { FORM_FIELDS } from './constants'
import { useNewUserStates } from './useNewUserStates'

export const NewUserPage = () => {
  const history = useHistory()
  const notifyContext = useNotifyContext()
  const registrationContext = useRegistrationsContext()

  const postRegistrationStates = usePostRegistration({
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationContext.setRegistrations,
    hasRegistrationsCached: !!registrationContext.registrations.length,
  })

  const newUserStates = useNewUserStates({
    routerProvider: history,
    formSubmitCallback: postRegistrationStates.createRegistrationFromApi,
    postRegistrationCalled: postRegistrationStates.postRegistrationCalled,
    postRegistrationLoading: postRegistrationStates.postRegistrationLoading,
    hasPostRegistrationError: !!postRegistrationStates.postRegistrationError,
    notifyProvider: notifyContext,
    postClearErrorState: postRegistrationStates.clearErrorState,
    postClearCalledState: postRegistrationStates.clearCalledState,
  })

  return (
    <Styled.Container data-testid="test-new-user-page">
      <Styled.BoxIconButton>
        <IconButton onClick={newUserStates.onPrevButtonClick} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
      </Styled.BoxIconButton>
      <Styled.Form
        data-testid="test-new-user-form"
        onSubmit={!newUserStates.showPostRegistrationLoading ? newUserStates.form.onSubmit : undefined}
      >
        {FORM_FIELDS.map(({ required, pattern, messages, maxLength, mask, ...field }) => (
          <TextField
            key={field.id}
            {...newUserStates.form.register(field.id, { required: required, pattern: pattern })}
            {...field}
            maxLength={maxLength}
            error={
              newUserStates.form.states.errors[field.id] &&
              messages[(newUserStates.form.states.errors as { [key: string]: { type: string } })[field.id]?.type]
            }
            onChange={e => mask && newUserStates.form.setValue(field.id, formMask[mask]({ value: e.target.value }))}
          />
        ))}
        <Styled.Button disabled={newUserStates.showPostRegistrationLoading} width="150px">
          Cadastrar
        </Styled.Button>
      </Styled.Form>

      {newUserStates.showPostRegistrationLoading && <Loading />}
    </Styled.Container>
  )
}
