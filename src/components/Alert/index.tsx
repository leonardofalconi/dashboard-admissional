import { FC, memo } from 'react'

import * as Styled from './styles'
import { Button } from '../Button'
import { IAlertProps } from './types'

const Component: FC<IAlertProps> = ({ onCancel, onConfirm, title, children }) => {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Description>{children}</Styled.Description>
        <Styled.BoxActions>
          <Button width="100px" height="40px" fontSize="15px" backgroundColor="#e80537" onClick={onCancel}>
            Cancelar
          </Button>
          <Button width="100px" height="40px" fontSize="15px" onClick={onConfirm}>
            Confirmar
          </Button>
        </Styled.BoxActions>
      </Styled.Content>
    </Styled.Container>
  )
}

export const Alert = memo(Component)
