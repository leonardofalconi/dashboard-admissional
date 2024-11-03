import { forwardRef } from 'react'

import * as Styled from './styles'
import { ITextFieldProps } from './types'

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(({ id, label, error, ...rest }, ref) => (
  <Styled.Container>
    <Styled.Label htmlFor={id}>{label}</Styled.Label>
    <Styled.Input {...rest} ref={ref} />
    <Styled.Error>{error}</Styled.Error>
  </Styled.Container>
))
