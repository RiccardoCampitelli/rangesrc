import * as React from 'react'
import styled from 'styled-components'

import { heights, dimensions, colors } from '../styles/variables'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: transparent;
  color: ${colors.white};
  position: fixed;
  z-index: 101;
  width: 100%;
`

const Title = styled.h1`
  color: ${colors.white};
  text-align: center;
`

const Triangle = styled.div`
  position: absolute;
  top: ${heights.header}px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 101;
`

const Svg = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 6rem;
`

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = () => (
  <>
    {/* <Triangle>
      <Svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200 0L0 0 598.97 114.72 1200 0z"
          className="shape-fill"
        ></path>
      </Svg>
    </Triangle> */}
    <StyledHeader>
      <Title>RANGESRC</Title>
    </StyledHeader>
  </>
)

export default Header
