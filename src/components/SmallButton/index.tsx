import { FC } from 'react'

import { Button } from '~/components/Button'

import { IButtonSmall } from './types'

export const SmallButton: FC<IButtonSmall> = ({ backgroundColor, textColor, onClick, children, disabled }) => (
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
