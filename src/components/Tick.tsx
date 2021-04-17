import React from 'react'
import { getColor } from 'src/styles/theme'

import styled, { keyframes } from 'styled-components'

const Fill = keyframes`
 to{
  stroke-dashoffset: 0;
 }
`

const Path = styled.path`
  stroke-dasharray: 450;
  stroke-dashoffset: 450;
  animation: ${Fill} 2s linear forwards;
  stroke: ${getColor('primary')};
`

const Svg = styled.svg`
  color: transparent;
`

const Poly = styled.polyline`
  fill: none;
  stroke: ${getColor('positive')};
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-miterlimit: 10;

  stroke-dasharray: 50;
  stroke-dashoffset: 50;

  animation: ${Fill} 2s linear forwards;
`

const Tick = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 37 37"
  >
    <Poly
      points="
	11.6,20 15.9,24.2 26.4,13.8 "
    />
  </Svg>
)

export { Tick }
