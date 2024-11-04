import { FC, memo } from 'react'
import { HiRefresh } from 'react-icons/hi'

import { Button } from '~/components/Button'
import { IconButton } from '~/components/IconButton'
import { TextField } from '~/components/TextField'

import * as Styled from './styles'
import { ISearchBarProps } from './types'

const Component: FC<ISearchBarProps> = ({ onRefreshButtonClick, onNewAdmissionButtonClick, disabled }) => (
  <Styled.Container>
    <TextField disabled={disabled} id="cpf" placeholder="Digite um CPF válido" />
    <Styled.Actions>
      <IconButton disabled={disabled} onClick={onRefreshButtonClick} aria-label="refetch">
        <HiRefresh />
      </IconButton>
      <Button disabled={disabled} onClick={onNewAdmissionButtonClick}>
        Nova Admissão
      </Button>
    </Styled.Actions>
  </Styled.Container>
)

export const SearchBar = memo(Component)
