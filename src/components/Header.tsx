import * as React from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import { heights, dimensions, colors } from '../styles/variables'
import { AppTheme, getColor, getFontWeight } from '../styles/theme'

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

const Link: React.FunctionComponent<Omit<GatsbyLinkProps<{}>, 'ref' | 'state'> &
  SpaceProps<AppTheme>> = styled(GatsbyLink)`
  color: ${getColor('primary')};
  font-weight: ${getFontWeight('bold')};
  text-decoration: none;
  ${space}
`

interface HeaderProps {
  title: string
}
const Header: React.FC<HeaderProps> = () => (
  <StyledHeader>
    <Link to="/">Home</Link>
    <Link mx={2} to="/shop">
      Shop
    </Link>
    <Link to="/about">About</Link>
  </StyledHeader>
)

export default Header
