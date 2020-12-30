import React from 'react'

import { ThemeProvider } from 'styled-components'
export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={{}}>{element}</ThemeProvider>
)
