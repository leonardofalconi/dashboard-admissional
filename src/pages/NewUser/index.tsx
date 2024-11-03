import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

import { IconButton } from '~/components/IconButton'
import { TextField } from '~/components/TextField'
import { formMask } from '~/utils/form'

import * as Styled from './styles'
import { FORM_FIELDS } from './constants'
import { useNewUSerStates } from './useNewUserStates'

export const NewUserPage = () => {
  const history = useHistory()

  const newUserStates = useNewUSerStates({ routerProvider: history })

  return (
    <Styled.Container>
      <Styled.BoxIconButton>
        <IconButton onClick={newUserStates.goToHome} aria-label="back">
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
    </Styled.Container>
  )
}
