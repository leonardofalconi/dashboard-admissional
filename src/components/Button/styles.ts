import styled from 'styled-components'

import { TButtonStyled } from './types'

export const Button = styled.button<TButtonStyled>`
  display: flex;
  outline: none;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  box-shadow: ${({ $hasShadow }) => $hasShadow && 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background-color: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize};

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`
