import * as React from 'react'
import { getColor } from 'src/styles/theme'
import styled from 'styled-components'

const StyledPage = styled.div`
  display: block;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  position: relative;
  /* background-color: ${getColor('neutralDark')}; */
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps> = ({ children, className }) => (
  <StyledPage className={className}>{children}</StyledPage>
)

export default Page
