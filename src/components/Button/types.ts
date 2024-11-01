import { ReactNode } from 'react'

export interface IButtonProps {
  width?: string
  height?: string
  backgroundColor?: string
  textColor?: string
  fontSize?: string
  borderRadius?: string
  fontWeight?: number
  hasShadow?: boolean
  padding?: string
  onClick?: () => void
  className?: string
  children: ReactNode
}

export type TButtonStyled = {
  $padding: string
  $background: string
  $color: string
  $fontSize: string
  $borderRadius: string
  $fontWeight: number
  $hasShadow: boolean
  $width: string
  $height: string
}
