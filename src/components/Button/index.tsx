import { FC, memo } from 'react'

import * as Styled from './styles'
import { IButtonProps } from './types'

const Component: FC<IButtonProps> = ({
  backgroundColor = '#64a98c',
  fontSize = '16px',
  borderRadius = '36px',
  textColor = '#FFFFFF',
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
    $width={width}
    $height={height}
    $padding={padding}
    $fontWeight={fontWeight}
    $background={backgroundColor}
    $borderRadius={borderRadius}
    $color={textColor}
    $fontSize={fontSize}
    $hasShadow={hasShadow}
    onClick={onClick}
    className={className}
    disabled={disabled}
  >
    {children}
  </Styled.Button>
)

export const Button = memo(Component)
