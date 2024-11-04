import { memo } from 'react'

import { IconLoading } from '~/libs/Icons/loading'

import * as Styled from './styles'

const Component = () => (
  <Styled.Container>
    <IconLoading width="150px" height="150px" color="#FFF" />
  </Styled.Container>
)

export const Loading = memo(Component)
