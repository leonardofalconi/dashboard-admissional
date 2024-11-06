import { memo } from 'react'

import { IconLoading } from '~/libs/Icons/loading'
import { Theme } from '~/theme'

import * as Styled from './styles'

const Component = () => (
  <Styled.Container>
    <IconLoading width="6.52rem" height="6.52rem" color={Theme.colors.white} />
  </Styled.Container>
)

export const Loading = memo(Component)
