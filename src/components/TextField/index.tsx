import { forwardRef, memo } from 'react'

import * as Styled from './styles'
import { ITextFieldProps } from './types'

const Component = forwardRef<HTMLInputElement, ITextFieldProps>(({ id, label, error, ...rest }, ref) => (
  <Styled.Container>
    <Styled.Label htmlFor={id}>{label}</Styled.Label>
    <Styled.Input id={id} {...rest} ref={ref} />
    <Styled.Error>{error}</Styled.Error>
  </Styled.Container>
))

export const TextField = memo(Component)
