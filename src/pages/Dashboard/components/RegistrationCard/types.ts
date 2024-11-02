import { IContact, TContactStatus } from '~/entities/contact'

export interface IRegistrationCardProps {
  contact: IContact
  onActions: (params: { actionType: TContactStatus | 'DELETE'; contact: IContact }) => void
}
