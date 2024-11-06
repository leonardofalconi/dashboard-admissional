import styled from 'styled-components'

import { TIconButtonStyled } from './types'

export const IconButton = styled.button<TIconButtonStyled>`
  cursor: pointer;
  border: 2px solid ${({ $borderColor }) => $borderColor};
  width: fit-content;
  padding: 0.17rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  svg {
    color: ${({ $color }) => $color};
    width: 1.2rem;
    height: 1.2rem;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;

    svg {
      cursor: default;
    }
  }
`
