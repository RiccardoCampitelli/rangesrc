import { Theme, TLengthStyledSystem } from 'styled-system'
import { ThemedStyledProps, DefaultTheme } from 'styled-components'

type LineHeight = 'solid' | 'title' | 'copy'
type LetterSpacing = 'normal' | 'tracked' | 'tight' | 'mega'

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
    brandYoutube: string
    brandSpotify: string
  }
  fonts: {
    // normal: string
    // cursive: string
    monospace: string
  }
  fontWeights: Record<string, number>
  fontSizes: number[]
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

const darkBase = {
  colors: {
    primary: '#e7edf1',
    secondary: '#fa8f4d',
    positive: '#50b87e',
    negative: '#ffbe44',
    neutralDarker: '#293132',
    neutralDark: '#111111',
    neutralMidDark: '#85898b',
    neutralMid: '#cacdcd',
    neutralMidLight: '#d9dbdb',
    neutralLight: '#eaeded',
    neutralLightest: '#fff',
    brandYoutube: '#ff0101',
    brandSpotify: '#1DB954'
  },
  fonts: {}
}

const lightBase = {
  colors: {
    secondary: '#e7edf1',
    primary: '#111111',
    positive: '#50b87e',
    negative: '#ffbe44',
    neutralDarker: '#293132',
    neutralDark: '#ffffff',
    neutralMidDark: '#85898b',
    neutralMid: '#cacdcd',
    neutralMidLight: '#d9dbdb',
    neutralLight: '#eaeded',
    neutralLightest: '#fff',
    brandYoutube: '#ff0101',
    brandSpotify: '#1DB954'
  },
  fonts: {}
}

const breakpoints: any = ['420px', '768px', '992px', '1200px']

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const sharedTheme = {
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
    '52rem',
    '70rem'
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
  fonts: {
    monospace: 'Passion One'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700
  },
  fontSizes: [16, 32, 64, 80, 120],
  breakpoints,
  buttonRadius: '5px'
}

const darkTheme: Partial<AppTheme> = {
  ...darkBase,
  ...sharedTheme
}

const lightTheme: Partial<AppTheme> = {
  ...lightBase,
  ...sharedTheme
}

// export default theme as AppTheme

export { darkTheme, lightTheme }

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

export const getLetterSpacing = (
  letterSpacing: keyof AppTheme['letterSpacings']
) => (p: ThemedStyledProps<unknown, DefaultTheme>) =>
  p.theme.letterSpacings[letterSpacing]

export const getSpace = (space: number) => (
  p: ThemedStyledProps<unknown, DefaultTheme>
) => p.theme.space[space]

export const getBreakpoint = (breakpoint: keyof AppTheme['breakpoints']) => (
  p: ThemedStyledProps<unknown, DefaultTheme>
) => p.theme.breakpoints[breakpoint]

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}
