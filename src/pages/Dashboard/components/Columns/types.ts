import { IContact, TContactStatus } from '~/entities/contact'
import { IRegistrationCardProps } from '~/pages/Dashboard/components/RegistrationCard/types'

export type TColumn = {
  title: string
  status: TContactStatus
}

export type TRegistrationColorsMap = { [key in TContactStatus]: { background: string; title: string } }

export interface IColumnsProps {
  registrations?: IContact[]
  action: IRegistrationCardProps['onActions']
  disabled?: boolean
}

export type TColumnStyled = {
  $status: TColumn['status']
}
