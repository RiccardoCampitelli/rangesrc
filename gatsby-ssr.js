import React from 'react'
import { ThemeProvider } from 'styled-components'
import { CartContextProvider } from 'src/context/CartContext'
import theme from 'src/styles/theme'
import { NewsLetterContextProvider } from 'src/context/NewsletterContext'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <NewsLetterContextProvider>{element}</NewsLetterContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  )
}
