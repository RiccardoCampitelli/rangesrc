import * as React from 'react'
import styled from 'styled-components'
import GlobalStyle from '../styles/normalize'

const StyledLayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  overflow-y: scroll;

  background: #a8b6ba;
  background: -webkit-linear-gradient(to bottom, #a8b6ba, #000000);
  background: linear-gradient(to bottom, #a8b6ba, #000000);
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
