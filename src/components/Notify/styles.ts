import styled from 'styled-components'

import { TNotifyContainerStyled } from './types'

export const Container = styled.div<TNotifyContainerStyled>`
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100px;
  padding: 10px;
  gap: 15px;
  border-radius: 15px;
  border: 1px solid #ffffff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);

  background-color: ${({ $backgroundColor }) => $backgroundColor};

  p {
    margin: 0;
    color: #ffffff;
  }
`

export const Title = styled.p`
  font-size: 18px;
`

export const Message = styled.p`
  font-size: 14px;
`
