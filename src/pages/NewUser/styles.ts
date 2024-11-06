import styled from 'styled-components'

import { Button as ButtonDefault } from '~/components/Button'
import { IconButton } from '~/components/IconButton/styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.69rem;
  border: 2px solid ${({ theme }) => theme.colors.antiFlashWhite};
  width: 21.7rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin: 7.3rem auto 0 auto;
  max-width: 90%;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.69rem;

  ${IconButton} {
    margin-bottom: 0.34rem;
    align-items: flex-start;
  }
`

export const Button = styled(ButtonDefault)`
  align-self: flex-end;
`

export const BoxIconButton = styled.div`
  display: flex;
  align-self: flex-start;
  margin-bottom: 0.43;
`
