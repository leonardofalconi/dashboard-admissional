import { IContact, TContactStatus } from '~/entities/contact'

export interface IRegistrationCardProps {
  contact: IContact
  onActions: (params: { actionType: TContactStatus | 'DELETE'; contact: IContact }) => void
  disabled?: boolean
}

export type TAlert = {
  isVisible: boolean
  title?: string
  description?: string
  onCancel?: () => void
  onConfirm?: () => void
}
