import { FC } from 'react'

import * as Styled from './styles'
import { IIconButtonProps } from './types'

export const IconButton: FC<IIconButtonProps> = ({ children, borderColor = '#64a98c', color = '#64a98c', ...rest }) => (
  <Styled.IconButton {...rest} $borderColor={borderColor} $color={color}>
    {children}
  </Styled.IconButton>
)
