import { Theme } from '~/theme'

import { TColumn, TRegistrationColorsMap } from './types'

export const ALL_COLUMNS: TColumn[] = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APPROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
]

export const REGISTRATION_COLORS_MAP: TRegistrationColorsMap = {
  REVIEW: {
    background: Theme.colors.cosmicLatte,
    title: Theme.colors.maizeCrayola,
  },
  APPROVED: {
    background: Theme.colors.aliceBlue,
    title: Theme.colors.palatinateBlue,
  },
  REPROVED: {
    background: Theme.colors.lavenderBlush,
    title: Theme.colors.royalFuchsia,
  },
}
