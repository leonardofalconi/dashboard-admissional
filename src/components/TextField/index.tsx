import { FC } from 'react'

import * as Styled from './styles'
import { ITextFieldProps } from './types'

export const TextField: FC<ITextFieldProps> = ({ id, label, error, ...rest }) => (
  <Styled.Container>
    <Styled.Label htmlFor={id}>{label}</Styled.Label>
    <Styled.Input {...rest} />
    <Styled.Error>{error}</Styled.Error>
  </Styled.Container>
)
