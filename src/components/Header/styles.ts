import styled from 'styled-components'

export const Header = styled.header`
  background: linear-gradient(258deg, rgba(255, 117, 0, 1) 8%, rgba(232, 5, 55, 1) 53%);
  width: 100%;
  height: 2.78rem;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0px 1rem;

  h1 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
  }
`
