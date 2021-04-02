import * as React from 'react'
import styled from 'styled-components/macro'

import { AppTheme } from 'src/styles/theme'
import {
  space,
  layout,
  SpaceProps,
  LayoutProps,
  flex,
  FlexProps,
  flexbox,
  FlexboxProps
} from 'styled-system'

interface StyledContainerProps
  extends SpaceProps<AppTheme>,
    LayoutProps<AppTheme>,
    FlexboxProps<AppTheme> {}

const StyledContainer = styled.div<StyledContainerProps>`
  position: relative;
  ${space}
  ${layout}
  ${flexbox}
`

const Container: React.FC = ({ children }) => (
  <StyledContainer
    // marginX="auto"
    // width="auto"
    flexDirection={['column', 'row']}
    // maxWidth={[9, 10]}
  >
    {children}
  </StyledContainer>
)

export default Container
