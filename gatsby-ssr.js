/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'src/styles/theme'
import { NewsLetterContextProvider } from 'src/context/NewsletterContext'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <NewsLetterContextProvider>{element}</NewsLetterContextProvider>
    </ThemeProvider>
  )
}
