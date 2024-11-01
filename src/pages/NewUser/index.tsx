import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

import { IconButton } from '~/components/IconButton'
import { TextField } from '~/components/TextField'
import { ROUTES } from '~/router/routes'

import * as Styled from './styles'

export const NewUserPage = () => {
  const history = useHistory()

  const goToHome = () => {
    history.push(ROUTES.dashboard)
  }

  return (
    <Styled.Container>
      <Styled.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField id="name" placeholder="Nome" label="Nome" />
        <TextField id="email" placeholder="Email" label="Email" type="email" />
        <TextField id="cpf" placeholder="CPF" label="CPF" />
        <TextField id="date" label="Data de admissão" type="date" />
        <Styled.Button width="150px" onClick={() => {}}>
          Cadastrar
        </Styled.Button>
      </Styled.Card>
    </Styled.Container>
  )
}
