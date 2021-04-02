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
`

const A = styled.a`
  color: ${getColor('primary')};
`

const Footer = () => {
  const { screenSize } = useScreenSize()

  const shouldShowLinks = screenSize === 'small'

  return (
    <>
      <Hr />
      <StyledFooter>
        {shouldShowLinks && (
          <P color="primary" textAlign="center">
            Follow us!
            <A href={SocialContacts.instagram} target="_blank" rel="noreferrer">
              <Icon ml={2} icon={faInstagram} color="primary" />
            </A>
            <A href={SocialContacts.spotify} target="_blank" rel="noreferrer">
              <Icon ml={2} icon={faSpotify} />
            </A>
          </P>
        )}
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
