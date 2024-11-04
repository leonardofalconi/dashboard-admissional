import { FC, ReactNode, memo } from 'react'

import * as Styled from './styles'

const Component: FC<{ children: ReactNode }> = ({ children }) => <Styled.Header>{children}</Styled.Header>

export const Header = memo(Component)
