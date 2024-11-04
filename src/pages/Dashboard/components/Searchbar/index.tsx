import { FC, memo } from 'react'
import { HiRefresh } from 'react-icons/hi'

import { Button } from '~/components/Button'
import { IconButton } from '~/components/IconButton'
import { TextField } from '~/components/TextField'

// import { formMask } from '~/utils/form'
import * as Styled from './styles'
import { ISearchBarProps } from './types'

const Component: FC<ISearchBarProps> = ({ onRefreshButtonClick, onNewAdmissionButtonClick, search, disabled }) => (
  <Styled.Container>
    <TextField {...search} disabled={disabled} id="search" placeholder="Digite um CPF válido" maxLength={14} />
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
