import styled, { css } from 'styled-components'

const FontBase = css`
  margin: 0;
`

export const Container = styled.div`
  position: fixed;
  z-index: 7;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`

export const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  padding: 20px;
`

export const Title = styled.p`
  font-size: 22px;

  ${FontBase};
`

export const Description = styled.div`
  font-size: 16px;

  ${FontBase};
`

export const BoxActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
