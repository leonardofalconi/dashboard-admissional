import { FC, memo } from 'react'

import { Theme } from '~/theme'

import * as Styled from './styles'
import { IButtonProps } from './types'

const Component: FC<IButtonProps> = ({
  backgroundColor = Theme.colors.polishedPine,
  fontSize = '16px',
  borderRadius = '36px',
  textColor = Theme.colors.white,
  fontWeight = 600,
  hasShadow = true,
  width = 'auto',
  height = '56px',
  padding = '8px 32px',
  className,
  onClick,
  disabled,
  children,
}) => (
  <Styled.Button
    data-testid="test-button"
    $width={width}
    $height={height}
    $padding={padding}
    $fontWeight={fontWeight}
    $background={backgroundColor}
    $borderRadius={borderRadius}
    $color={textColor}
    $fontSize={fontSize}
    $hasShadow={hasShadow}
    onClick={!disabled ? onClick : undefined}
    className={className}
    disabled={disabled}
  >
    {children}
  </Styled.Button>
)

export const Button = memo(Component)
