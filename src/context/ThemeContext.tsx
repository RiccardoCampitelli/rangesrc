import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { ThemeProvider, useTheme } from 'styled-components'

import { AppTheme, darkTheme, lightTheme } from 'src/styles/theme'

const DEFAULT_VALUE: ThemeContextValue = {
  changeTheme: () => {}
}

interface ThemeContextValue {
  changeTheme: Dispatch<SetStateAction<ThemeValue>>
}

const ThemeContext = createContext<ThemeContextValue>(DEFAULT_VALUE)

const useThemeContext = () => useContext(ThemeContext)

const useLightTheme = () => {
  const { changeTheme } = useThemeContext()

  useEffect(() => {
    changeTheme('light')
  }, [])
}
const useDarkTheme = () => {
  const { changeTheme } = useThemeContext()

  useEffect(() => {
    changeTheme('dark')
  }, [])
}

type ThemeValue = 'light' | 'dark'

const selectTheme = (value: ThemeValue): AppTheme => {
  let selectedTheme = null

  if (value === 'dark') selectedTheme = darkTheme

  if (value === 'light') selectedTheme = lightTheme

  return selectedTheme as AppTheme
}

const ThemeContextProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState<ThemeValue>('dark')

  const contextValue = {
    changeTheme: setValue
  }

  const theme = selectTheme(value)

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { useThemeContext, ThemeContextProvider, useLightTheme, useDarkTheme }
