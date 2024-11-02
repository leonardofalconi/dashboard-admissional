import { IContact, TContactStatus } from '~/entities/contact'

import { IRegistrationCardProps } from '../RegistrationCard/types'

export type TColumn = {
  title: string
  status: TContactStatus
}

export type TRegistrationColorsMap = { [key in TContactStatus]: { background: string; title: string } }

export interface IColumnsProps {
  registrations?: IContact[]
  actions: IRegistrationCardProps['onActions']
}

export type TColumnStyled = {
  $status: TColumn['status']
}
