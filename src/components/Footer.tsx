import React from 'react'
import {
  faInstagram,
  faSpotify,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
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

import { SocialContacts } from 'src/data/social-contacts'
import { useScreenSize } from 'src/hooks/useScreenSize'

const StyledFooter = styled.footer`
  flex: 1 1 auto;
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
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${getColor('primary')};
`

const A = styled.a`
  color: ${getColor('primary')};
`

const Footer = () => {
  return (
    <>
      <Hr />
      <StyledFooter>
        <P fontSize={12} color="primary" textAlign="right" marginX={2}>
          Made with ♥️ by{' '}
          <A
            href="https://github.com/RiccardoCampitelli"
            target="_blank"
            rel="noreferrer"
          >
            Riccardo Campitelli
          </A>
        </P>
      </StyledFooter>
    </>
  )
}

export { Footer }
