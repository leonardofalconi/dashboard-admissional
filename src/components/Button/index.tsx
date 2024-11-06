import { FC, memo } from 'react'

import { Theme } from '~/theme'

import * as Styled from './styles'
import { IButtonProps } from './types'

const Component: FC<IButtonProps> = ({
  backgroundColor = Theme.colors.polishedPine,
  fontSize = '0.69rem',
  borderRadius = '1.56rem',
  textColor = Theme.colors.white,
  fontWeight = 600,
  hasShadow = true,
  width = 'auto',
  height = '2.43rem',
  padding = '0.35rem 1.39rem',
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
