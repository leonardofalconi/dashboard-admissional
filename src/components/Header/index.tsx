import { FC, ReactNode } from 'react'

import * as Styled from './styles'

export const Header: FC<{ children: ReactNode }> = ({ children }) => <Styled.Header>{children}</Styled.Header>
