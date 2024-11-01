import styled from 'styled-components'

import { REGISTRATION_COLORS_MAP } from './constants'
import { TColumnStyled } from './types'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`

export const Column = styled.div<TColumnStyled>`
  height: auto;
  background-color: ${({ $status }) => REGISTRATION_COLORS_MAP[$status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`

export const TitleColumn = styled.h3<TColumnStyled>`
  margin: 0px;
  color: ${({ $status }) => REGISTRATION_COLORS_MAP[$status].title};
  margin: 24px;
`

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`
