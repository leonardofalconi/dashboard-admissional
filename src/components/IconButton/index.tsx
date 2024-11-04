import { FC, memo } from 'react'

import * as Styled from './styles'
import { IIconButtonProps } from './types'

const Component: FC<IIconButtonProps> = ({ children, borderColor = '#64a98c', color = '#64a98c', ...rest }) => (
  <Styled.IconButton {...rest} $borderColor={borderColor} $color={color}>
    {children}
  </Styled.IconButton>
)

export const IconButton = memo(Component)
