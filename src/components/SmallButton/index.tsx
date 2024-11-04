import { FC, memo } from 'react'

import { Button } from '~/components/Button'

import { IButtonSmall } from './types'

const Component: FC<IButtonSmall> = ({ backgroundColor, textColor, onClick, children, disabled }) => (
  <Button
    height="auto"
    fontSize="12px"
    borderRadius="4px"
    padding="4px 16px"
    textColor={textColor}
    backgroundColor={backgroundColor}
    hasShadow={false}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </Button>
)

export const SmallButton = memo(Component)
