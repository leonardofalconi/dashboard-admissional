import { FC, memo } from 'react'

import { Button } from '~/components/Button'
import { Theme } from '~/theme'

import * as Styled from './styles'
import { IAlertProps } from './types'

const Component: FC<IAlertProps> = ({ onCancel, onConfirm, title, children }) => (
  <Styled.Container data-testid="test-alert">
    <Styled.Content>
      <Styled.Title data-testid="test-alert-title">{title}</Styled.Title>
      <Styled.Description data-testid="test-alert-description">{children}</Styled.Description>
      <Styled.BoxActions data-testid="test-alert-actions">
        <Button
          width="4.3rem"
          height="1.7rem"
          fontSize="0.65rem"
          backgroundColor={Theme.colors.redMunsell}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button width="4.3rem" height="1.7rem" fontSize="0.65rem" onClick={onConfirm}>
          Confirmar
        </Button>
      </Styled.BoxActions>
    </Styled.Content>
  </Styled.Container>
)

export const Alert = memo(Component)
