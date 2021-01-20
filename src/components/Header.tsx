import * as React from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import { useScreenSize } from 'src/hooks/useScreenSize'
import { Burger } from 'src/components/Burger'
import { heights, dimensions, colors } from '../styles/variables'
import { AppTheme, getColor, getFontWeight } from '../styles/theme'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;

  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: transparent;
  color: ${colors.white};
  position: fixed;
  z-index: 101;
  width: 100%;
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

const Header: React.FC<HeaderProps> = () => {
  const { screenSize } = useScreenSize()

  console.log({ screenSize })

  const isSmallOrMedium = screenSize === 'small' || screenSize === 'medium'

  if (isSmallOrMedium)
    return (
      <StyledHeader>
        <Burger />
      </StyledHeader>
    )

  return (
    <StyledHeader>
      <Link to="/">Home</Link>
      <Link mx={2} to="/shop">
        Shop
      </Link>
      <Link to="/about">About</Link>
    </StyledHeader>
  )
}

export default Header
