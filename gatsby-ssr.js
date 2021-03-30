import React from 'react'
import { ThemeProvider } from 'styled-components'
import { CartContextProvider } from 'src/context/CartContext'
import theme from 'src/styles/theme'

export const wrapRootElement = ({ element }) => (
  <CartContextProvider>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </CartContextProvider>
)
