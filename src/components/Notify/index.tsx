import { FC, memo } from 'react'

import * as Styled from './styles'
import { INotifyProps } from './types'

const Component: FC<INotifyProps> = ({ title, message, status }) => (
  <Styled.Container $backgroundColor={status === 'error' ? '#e80537' : '#64a98c'}>
    <Styled.Title>{title}</Styled.Title>
    <Styled.Message>{message}</Styled.Message>
  </Styled.Container>
)

export const Notify = memo(Component)
