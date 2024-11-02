import { ReactNode } from 'react'

export interface IButtonSmall {
  backgroundColor: string
  textColor: string
  onClick: () => void
  children: ReactNode
}
