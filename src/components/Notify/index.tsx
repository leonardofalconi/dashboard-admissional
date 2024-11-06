import { FC, memo } from 'react'

import { Theme } from '~/theme'

import * as Styled from './styles'
import { INotifyProps } from './types'

const Component: FC<INotifyProps> = ({ title, message, status }) => (
  <Styled.Container
    data-testid="test-notify"
    $backgroundColor={status === 'error' ? Theme.colors.redMunsell : Theme.colors.polishedPine}
  >
    <Styled.Title data-testid="test-notify-title">{title}</Styled.Title>
    <Styled.Message data-testid="test-notify-message">{message}</Styled.Message>
  </Styled.Container>
)

export const Notify = memo(Component)
