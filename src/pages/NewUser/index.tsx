import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

import { API } from '~/api'
import { IconButton } from '~/components/IconButton'
import { TextField } from '~/components/TextField'
import { useRegistrationsContext } from '~/contexts/useRegistrations'
import { usePostRegistration } from '~/hooks/registrations/usePostRegistration'
import { formMask } from '~/utils/form'

import * as Styled from './styles'
import { FORM_FIELDS } from './constants'
import { useNewUserStates } from './useNewUserStates'

export const NewUserPage = () => {
  const history = useHistory()

  const registrationContext = useRegistrationsContext()

  const usePostRegistrationStates = usePostRegistration({
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationContext.setRegistrations,
    hasRegistrationsCached: Boolean(registrationContext.registrations.length),
  })

  const newUserStates = useNewUserStates({
    routerProvider: history,
    formSubmitCallback: usePostRegistrationStates.createRegistrationFromApi,
    postRegistrationCalled: usePostRegistrationStates.postRegistrationCalled,
    postRegistrationLoading: usePostRegistrationStates.postRegistrationLoading,
    hasPostRegistrationError: Boolean(usePostRegistrationStates.postRegistrationError),
  })

  return (
    <Styled.Container>
      <Styled.BoxIconButton>
        <IconButton onClick={newUserStates.onPrevButtonClick} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
      </Styled.BoxIconButton>
      <Styled.Form onSubmit={newUserStates.form.onSubmit}>
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
        <Styled.Button width="150px">Cadastrar</Styled.Button>
      </Styled.Form>

      {newUserStates.showPostRegistrationError && <p>Error</p>}

      {newUserStates.showPostRegistrationLoading && <p>Loading</p>}
    </Styled.Container>
  )
}
