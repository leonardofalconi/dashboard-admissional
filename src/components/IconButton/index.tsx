import { FC, memo } from 'react'

import { Theme } from '~/theme'

import * as Styled from './styles'
import { IIconButtonProps } from './types'

const Component: FC<IIconButtonProps> = ({
  children,
  borderColor = Theme.colors.polishedPine,
  color = Theme.colors.polishedPine,
  ...rest
}) => (
  <Styled.IconButton data-testid="test-icon-button" {...rest} $borderColor={borderColor} $color={color}>
    {children}
  </Styled.IconButton>
)

export const IconButton = memo(Component)
