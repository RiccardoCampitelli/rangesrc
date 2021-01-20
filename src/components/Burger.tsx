import React from 'react'
import { getColor } from 'src/styles/theme'

import styled from 'styled-components'

const BurgerButton = styled.button`
  background: inherit;
  border: none;
  padding: 0;

  &:focus {
    outline: none;
  }
`

const Rect = styled.rect`
  fill: ${getColor('primary')};
`

const Burger: React.FC = () => (
  <BurgerButton>
    <svg viewBox="0 0 100 80" width="40" height="40">
      <Rect width="100" height="20" rx="8" />
      <Rect y="30" width="100" height="20" rx="8" />
      <Rect y="60" width="100" height="20" rx="8" />
    </svg>
  </BurgerButton>
)

export { Burger }
