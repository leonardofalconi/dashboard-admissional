import styled from 'styled-components'

import { REGISTRATION_COLORS_MAP } from './constants'
import { TColumnStyled } from './types'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  min-width: 50rem;
`

export const Column = styled.div<TColumnStyled>`
  width: 33%;
  height: auto;
  background-color: ${({ $status }) => REGISTRATION_COLORS_MAP[$status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
  min-width: 10rem;
`

export const TitleColumn = styled.h3<TColumnStyled>`
  margin: 0px;
  color: ${({ $status }) => REGISTRATION_COLORS_MAP[$status].title};
  margin: 1rem;
`

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`
