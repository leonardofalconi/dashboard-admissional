import { ReactNode } from 'react'

export interface IAlertProps {
  title: string
  children: ReactNode
  onCancel: () => void
  onConfirm: () => void
}
