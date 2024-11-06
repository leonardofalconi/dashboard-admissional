import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.21rem;
`

export const Label = styled.label``

export const Error = styled.span`
  font-size: 0.52rem;
  color: ${({ theme }) => theme.colors.redMunsell};
`

export const Input = styled.input`
  padding: 0 0.34rem;
  vertical-align: middle;
  border-radius: 2px;
  min-height: 1.56rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 0.69rem;
  line-height: 0.78rem;
  font-weight: normal;
  border-radius: 8px;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.teal};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.teal};
  }

  &:disabled {
    opacity: 0.3;
  }
`
