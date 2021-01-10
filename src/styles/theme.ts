import { Theme, TLengthStyledSystem } from 'styled-system'
import { ThemedStyledProps, DefaultTheme } from 'styled-components'

type LineHeight = 'solid' | 'title' | 'copy'
type LetterSpacing = 'normal' | 'tracked' | 'tight' | 'mega'
type FontSize = 'normal' | 'big' | 'huge'

export interface AppTheme extends Required<Theme<TLengthStyledSystem>> {
  colors: {
    primary: string
    secondary: string
    positive: string
    negative: string
    neutralDarker: string
    neutralDark: string
    neutralMidDark: string
    neutralMid: string
    neutralMidLight: string
    neutralLight: string
    neutralLightest: string
  }
  fonts: {
    // normal: string
    // cursive: string
    // monospace: string
  }
  fontWeights: Record<string, number>
  // fontSizes: Record<FontSize, number>
  fontSizes: number[]
  rowOrColumn: string[]
  buttonRadius: string
  lineHeights: Record<LineHeight, string | number>
  letterSpacings: Record<LetterSpacing, string | number>
  breakpoints: {
    _: 0
    sm: string
    md: string
    lg: string
    xl: string
  }
}

const baseTheme = {
  colors: {
    primary: '#e7edf1',
    secondary: '#fa8f4d',
    positive: '#50b87e',
    negative: '#cc3333',
    neutralDarker: '#293132',
    neutralDark: '#414549',
    neutralMidDark: '#85898b',
    neutralMid: '#cacdcd',
    neutralMidLight: '#d9dbdb',
    neutralLight: '#eaeded',
    neutralLightest: '#fff'
  },
  fonts: {}
}

const breakpoints: any = ['420px', '768px', '992px', '1200px']

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const theme: Partial<AppTheme> = {
  ...baseTheme,
  space: [0, '0.5rem', '0.75rem', '1rem', '2rem', '4rem', '8rem', '16rem'],

  sizes: [
    0,
    '1rem',
    '1.618rem',
    '2.618rem',
    '4.24rem',
    '6.85rem',
    '12rem',
    '18rem',
    '32rem',
    '52rem'
  ],
  lineHeights: {
    solid: '1rem',
    title: '1.25rem',
    copy: '1.5rem'
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em'
  },

  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700
  },
  rowOrColumn: ['column', 'row'],
  fontSizes: [1, 2, 4],
  // fontSizes: {
  //   normal: 1,
  //   big: 2,
  //   huge: 4
  // },
  breakpoints: breakpoints,
  buttonRadius: '5px'
}

export default theme as AppTheme

export const getColor = (color: keyof AppTheme['colors']) => (
  p: ThemedStyledProps<unknown, DefaultTheme>
) => p.theme.colors[color]

export const getFont = (font: keyof AppTheme['fonts']) => (
  p: ThemedStyledProps<unknown, DefaultTheme>
) => p.theme.fonts[font]

export const getFontWeight = (fontWeight: keyof AppTheme['fontWeights']) => (
  p: ThemedStyledProps<unknown, DefaultTheme>
) => p.theme.fontWeights[fontWeight]

export const getFontSize = (fontSize: number) => (
  p: ThemedStyledProps<unknown, DefaultTheme>
) => p.theme.fontSizes[fontSize]

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}
