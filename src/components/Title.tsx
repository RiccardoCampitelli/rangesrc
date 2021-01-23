import { HTMLProps } from 'react'
import styled, { keyframes } from 'styled-components'
import { typography, TypographyProps } from 'styled-system'
import { AppTheme, getColor, getLetterSpacing } from 'src/styles/theme'

const enterAnimation = keyframes`
  0% {
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
}
`

type H1Props = HTMLProps<HTMLHeadElement> & TypographyProps<AppTheme>

const Title: React.FC<H1Props> = styled.h1`
  position: sticky;
  font-family: 'Passion One';
  font-weight: 900;
  letter-spacing: ${getLetterSpacing('tracked')};
  top: 0;
  margin-top: -70vh;
  margin-bottom: 70vh;
  text-align: center;
  color: ${getColor('primary')};
  z-index: 100;
  padding-top: 1rem;
  animation: ${enterAnimation} 1s ease-in;
  user-select: none;
  ${typography};
`

export { Title }