import { FC } from 'react'

import * as Styled from './styles'
import { INotifyProps } from './types'

export const Notify: FC<INotifyProps> = ({ title, message, status }) => (
  <Styled.Container $backgroundColor={status === 'error' ? '#e80537' : '#64a98c'}>
    <Styled.Title>{title}</Styled.Title>
    <Styled.Message>{message}</Styled.Message>
  </Styled.Container>
)
