import { FC, memo } from 'react'

import { Button } from '~/components/Button'

import { IButtonSmall } from './types'

const Component: FC<IButtonSmall> = ({ backgroundColor, textColor, onClick, children, disabled }) => (
  <Button
    data-testid="test-button-small"
    height="auto"
    fontSize="0.52rem"
    borderRadius="4px"
    padding="0.17rem 0.69rem"
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
