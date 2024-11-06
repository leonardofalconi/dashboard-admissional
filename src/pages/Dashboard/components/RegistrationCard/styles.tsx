import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid ${({ theme }) => theme.colors.white};
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  h3,
  p {
    margin: 0;
  }
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
`

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 15px;

  svg {
    cursor: pointer;
  }

  button:last-child {
    margin-left: auto;
  }
`
