import React from 'react'
import { faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { AppTheme, getColor } from 'src/styles/theme'
import { Icon } from 'src/components/Icon'
import styled from 'styled-components'
import {
  typography,
  space,
  color,
  TypographyProps,
  SpaceProps,
  ColorProps
} from 'styled-system'

const StyledFooter = styled.footer`
  flex: 1 1 auto;
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* color: ${getColor('primary')}; */
  /* text-align: center; */
`

type ParagraphProps = TypographyProps<AppTheme> &
  SpaceProps<AppTheme> &
  ColorProps<AppTheme>

const P = styled.p<ParagraphProps>`
  ${typography}
  ${space}
  ${color}
`

const Hr = styled.hr`
  margin-top: 5rem;
  width: 100%;
  color: ${getColor('primary')};
`

const Footer = () => {
  return (
    <>
      <Hr />
      <StyledFooter>
        <P color="primary" textAlign="center">
          Follow us!
          <Icon ml={2} icon={faInstagram} />
          <Icon ml={2} icon={faSpotify} />
        </P>
        <P fontSize={12} color="primary" textAlign="right" marginX={2}>
          Made with ♥️ by Riccardo Campitelli
        </P>
      </StyledFooter>
    </>
  )
}

export { Footer }
