import { ButtonHTMLAttributes } from 'react'

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  borderColor?: string
  color?: string
}

export type TIconButtonStyled = {
  $borderColor: string
  $color: string
}
