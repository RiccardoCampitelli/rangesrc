import React from 'react'
import { ThemeProvider } from 'styled-components'
import { CartContextProvider } from 'src/context/CartContext'
import { darkTheme } from 'src/styles/theme'
import { NewsLetterContextProvider } from 'src/context/NewsletterContext'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CartContextProvider>
        <NewsLetterContextProvider>{element}</NewsLetterContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  )
}
