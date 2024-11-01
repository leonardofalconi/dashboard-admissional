import { FC } from 'react'
import { HiRefresh } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'

import { Button } from '~/components/Button'
import { IconButton } from '~/components/IconButton'
import { TextField } from '~/components/TextField'
import { ROUTES } from '~/router/routes'

import * as Styled from './styles'
import { ISearchBarProps } from './types'

export const SearchBar: FC<ISearchBarProps> = ({ onRefreshButtonClick }) => {
  const history = useHistory()

  const goToNewAdmissionPage = () => {
    history.push(ROUTES.newUser)
  }

  return (
    <Styled.Container>
      <TextField id="cpf" placeholder="Digite um CPF válido" />
      <Styled.Actions>
        <IconButton onClick={onRefreshButtonClick} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </Styled.Actions>
    </Styled.Container>
  )
}
