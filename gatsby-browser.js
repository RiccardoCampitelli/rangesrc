import React from 'react'

import { ThemeProvider } from 'styled-components'
import theme from 'src/styles/theme'
import { NewsLetterContextProvider } from 'src/context/NewsletterContext'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <NewsLetterContextProvider>{element}</NewsLetterContextProvider>
  </ThemeProvider>
)
