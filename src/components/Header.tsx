import React, { useState } from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import styled, { css } from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import { useScreenSize } from 'src/hooks/useScreenSize'
import { useCartContext, useGoToCheckout } from 'src/context/CartContext'
import { Burger } from 'src/components/Burger'
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { heights, colors } from '../styles/variables'
import { AppTheme, getColor, getFontWeight, getSpace } from '../styles/theme'
import { Icon } from './Icon'

const StyledHeader = styled.header<SpaceProps<AppTheme>>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 1rem;
  padding-right: 1rem;

  height: ${heights.header}px;
  background-color: transparent;
  color: ${colors.white};
  position: fixed;
  z-index: 101;
  width: 100%;
  ${space}
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

  /* background-color: #111; */
  background-color: ${getColor('neutralDark')};
  color: ${getColor('primary')};
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`

const Label = styled.div`
  background-color: red;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
`

const Header: React.FC = () => {
  const { screenSize } = useScreenSize()
  const { cart } = useCartContext()
  const [isOpen, setIsOpen] = useState(false)

  const isSmallOrMedium = screenSize === 'small' || screenSize === 'medium'

  const toggleIsOpen = () => setIsOpen(current => !current)

  const closeMenu = () => setIsOpen(false)

  const lineItems = cart.checkout?.lineItems

  const total = lineItems.reduce((acc, item) => item.quantity + acc, 0)

  return (
    <>
      <StyledHeader>
        {isSmallOrMedium ? (
          <Burger onClick={toggleIsOpen} />
        ) : (
          <div>
            <Link to="/">Home</Link>
            <Link ml={2} to="/shop">
              Shop
            </Link>
            <Link ml={2} to="/about">
              About
            </Link>
            <Link ml={2} to="/contact">
              Contact
            </Link>
          </div>
        )}
        <Link to="/checkout">
          <Icon icon={faShoppingCart} size="2x" />
          {total > 0 && <Label>{total}</Label>}
        </Link>
      </StyledHeader>

      <SideNav isOpen={isOpen}>
        <Icon ml="auto" icon={faTimes} size="2x" onClick={closeMenu} />
        <Link onClick={closeMenu} my={2} to="/">
          Home
        </Link>
        <Link onClick={closeMenu} my={2} to="/shop">
          Shop
        </Link>
        <Link onClick={closeMenu} my={2} to="/about">
          About
        </Link>
        <Link onClick={closeMenu} my={2} to="/contact">
          Contact
        </Link>
      </SideNav>
    </>
  )
}

export default Header
