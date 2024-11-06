/* eslint-disable import/export */
import { ThemeProvider } from 'styled-components'

import { FC, ReactElement, ReactNode } from 'react'

import { RenderOptions, RenderResult, render } from '@testing-library/react'

import { Theme } from '../theme'

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
