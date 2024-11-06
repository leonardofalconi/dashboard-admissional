import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.17rem;
  border: 4px solid ${({ theme }) => theme.colors.white};
  margin: 0.69rem;
  border-radius: 8px;
  padding: 0.69rem;
  background-color: ${({ theme }) => theme.colors.white};

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);

  svg {
    flex-shrink: 0;
  }

  p,
  span {
    font-size: 0.8rem;
  }
`

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.34rem;
`

export const Actions = styled.div`
  margin-top: 0.34rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;

  svg {
    cursor: pointer;
    width: 0.8rem;
    height: 0.8rem;
  }

  button:last-child {
    margin-left: auto;
  }
`
