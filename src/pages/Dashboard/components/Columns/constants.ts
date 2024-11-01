import { TCOLUMN, TRegistrationColorsMap } from './types'

export const ALL_COLUMNS: TCOLUMN[] = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APPROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
]

export const REGISTRATION_COLORS_MAP: TRegistrationColorsMap = {
  REVIEW: {
    background: '#FDF8E9',
    title: '#EFC24D',
  },
  APPROVED: {
    background: '#EEEEFD',
    title: '#4242DF',
  },
  REPROVED: {
    background: '#FBEDF6',
    title: '#CE2893',
  },
}
