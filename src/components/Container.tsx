import * as React from 'react'
import styled from 'styled-components/macro'

import { AppTheme } from 'src/styles/theme'
import { space, layout, SpaceProps, LayoutProps } from 'styled-system'

interface StyledContainerProps
  extends SpaceProps<AppTheme>,
    LayoutProps<AppTheme> {}

const StyledContainer = styled.div<StyledContainerProps>`
  position: relative;
  ${space}
  ${layout}
`

const Container: React.FC = ({ children }) => (
  <StyledContainer marginX="auto" width="auto" maxWidth={[9, 10]}>
    {children}
  </StyledContainer>
)

export default Container
