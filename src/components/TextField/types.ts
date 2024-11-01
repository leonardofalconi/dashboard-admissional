import { InputHTMLAttributes } from 'react'

export interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  error?: string
}
