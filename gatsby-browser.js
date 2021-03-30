import React from 'react'

import { ThemeProvider } from 'styled-components'
import theme from 'src/styles/theme'
import { CartContextProvider } from 'src/context/CartContext'

export const wrapRootElement = ({ element }) => (
  <CartContextProvider>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </CartContextProvider>
)
