import { IContact, TContactStatus } from '~/entities/contact'

export type TCOLUMN = {
  title: string
  status: TContactStatus
}

export type TRegistrationColorsMap = { [key in TContactStatus]: { background: string; title: string } }

export interface IColumnsProps {
  registrations?: IContact[]
}

export type TColumnStyled = {
  $status: TCOLUMN['status']
}
