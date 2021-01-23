import React, { useState } from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import styled, { css } from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import { useScreenSize } from 'src/hooks/useScreenSize'
import { Burger } from 'src/components/Burger'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { heights, dimensions, colors } from '../styles/variables'
import { AppTheme, getColor, getFontWeight, getSpace } from '../styles/theme'
import { Icon } from './Icon'

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

interface SideNavProps {
  isOpen: boolean
}

const openStyles = css`
  width: ${getSpace(7)};
  padding-left: 2rem;
  padding-right: 2rem;
`

const closedStyles = css`
  width: 0;
`

const SideNav = styled.div<SideNavProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${props => (props.isOpen ? openStyles : closedStyles)}

  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;

  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`

const Header: React.FC = () => {
  const { screenSize } = useScreenSize()
  const [isOpen, setIsOpen] = useState(false)

  const isSmallOrMedium = screenSize === 'small' || screenSize === 'medium'

  const toggleIsOpen = () => setIsOpen(current => !current)

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <StyledHeader>
        {isSmallOrMedium ? (
          <Burger onClick={toggleIsOpen} />
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link mx={2} to="/shop">
              Shop
            </Link>
            <Link to="/about">About</Link>
          </>
        )}
      </StyledHeader>

      <SideNav isOpen={isOpen}>
        <Icon
          marginLeft="auto"
          icon={faTimes}
          size="2x"
          color="white"
          onClick={closeMenu}
        />
        <Link onClick={closeMenu} my={2} to="/">
          Home
        </Link>
        <Link onClick={closeMenu} my={2} to="/shop">
          Shop
        </Link>
        <Link onClick={closeMenu} my={2} to="/about">
          About
        </Link>
      </SideNav>
    </>
  )
}

export default Header
