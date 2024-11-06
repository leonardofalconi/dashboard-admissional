import styled from 'styled-components'

import { TNotifyContainerStyled } from './types'

export const Container = styled.div<TNotifyContainerStyled>`
  position: fixed;
  right: 0.65rem;
  bottom: 0.65rem;
  z-index: 9;
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: 4.34rem;
  padding: 0.43rem;
  gap: 0.65rem;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);

  background-color: ${({ $backgroundColor }) => $backgroundColor};

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.white};
  }
`

export const Title = styled.p`
  font-size: 0.78rem;
`

export const Message = styled.p`
  font-size: 0.6rem;
`
