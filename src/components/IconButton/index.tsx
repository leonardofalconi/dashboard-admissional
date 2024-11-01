import { FC } from 'react'

import * as Styled from './styles'
import { IIconButtonProps } from './types'

export const IconButton: FC<IIconButtonProps> = ({ children, ...rest }) => (
  <Styled.IconButton {...rest}>{children}</Styled.IconButton>
)
