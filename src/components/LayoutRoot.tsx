import * as React from 'react'
import { getColor } from 'src/styles/theme'
import styled from 'styled-components'
import GlobalStyle from '../styles/normalize'

const StyledLayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /* background: #111111; */
  background: ${getColor('neutralDark')};
`

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => (
  <>
    <GlobalStyle />
    <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
  </>
)

export default LayoutRoot
