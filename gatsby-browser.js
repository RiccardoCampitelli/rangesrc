import React from 'react'

import { ThemeProvider } from 'styled-components'
import theme from 'src/styles/theme'
import { CartContextProvider } from 'src/context/CartContext'
import { NewsLetterContextProvider } from 'src/context/NewsletterContext'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CartContextProvider>
      <NewsLetterContextProvider>{element}</NewsLetterContextProvider>
    </CartContextProvider>
  </ThemeProvider>
)
