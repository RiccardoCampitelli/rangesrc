import React, { ButtonHTMLAttributes } from 'react'
import { getColor } from 'src/styles/theme'

import styled from 'styled-components'

const BurgerButton = styled.button`
  background: inherit;
  border: none;
  padding: 0;
  z-index: 101;
  &:focus {
    outline: none;
  }
`

const Rect = styled.rect`
  fill: ${getColor('primary')};
`

const Burger = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <BurgerButton {...props}>
    <svg viewBox="0 0 100 80" width="40" height="40">
      <Rect width="90" height="15" rx="8" />
      <Rect x="2" y="30" width="90" height="15" rx="8" />
      <Rect x="4" y="60" width="90" height="15" rx="8" />
    </svg>
  </BurgerButton>
)

export { Burger }
