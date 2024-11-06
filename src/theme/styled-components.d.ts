import 'styled-components'

import { Theme } from '.'

type TThemeInterface = typeof Theme

declare module 'styled-components' {
  export interface DefaultTheme extends TThemeInterface {}
}
