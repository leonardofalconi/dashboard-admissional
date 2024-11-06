import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.69rem;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.69rem;

  svg {
    width: 1rem;
    height: 1rem;

    ${({ theme }) => theme.media.HD.query} {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`
