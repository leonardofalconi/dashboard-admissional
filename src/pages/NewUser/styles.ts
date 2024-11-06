import styled from 'styled-components'

import { Button as ButtonDefault } from '~/components/Button'
import { IconButton } from '~/components/IconButton/styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  border: 2px solid ${({ theme }) => theme.colors.antiFlashWhite};
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  margin: 168px auto 0 auto;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${IconButton} {
    margin-bottom: 8px;
    align-items: flex-start;
  }
`

export const Button = styled(ButtonDefault)`
  align-self: flex-end;
`

export const BoxIconButton = styled.div`
  display: flex;
  align-self: flex-start;
  margin-bottom: 10px;
`
