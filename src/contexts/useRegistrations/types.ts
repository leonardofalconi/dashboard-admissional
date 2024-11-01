import { IContact } from '~/entities/contact'

export interface IRegistrationsContext {
  registrations: IContact[]
  setRegistrations: React.Dispatch<React.SetStateAction<IContact[]>>
}
