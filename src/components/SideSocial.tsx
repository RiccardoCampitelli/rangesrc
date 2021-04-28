import React from 'react'
import { getColor, getSpace } from 'src/styles/theme'

import styled, { keyframes } from 'styled-components'

import { SocialContacts } from 'src/data/social-contacts'
import {
  faInstagram,
  faSpotify,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { useNewsLetterContext } from 'src/context/NewsletterContext'
import { Icon } from './Icon'

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

const AlignRight = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 100;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`

const A = styled.a`
  color: ${getColor('primary')};
  margin-top: ${getSpace(2)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AnimatedIcon = styled(Icon)`
  animation: ${enterAnimation} 0.5s ease-in;
`

const SideSocial = () => {
  const { setNewsLetterState } = useNewsLetterContext()
  return (
    <AlignRight>
      <A href={SocialContacts.spotify} target="_blank" rel="noreferrer">
        <AnimatedIcon mr={2} icon={faSpotify} />
      </A>
      <A href={SocialContacts.instagram} target="_blank" rel="noreferrer">
        <AnimatedIcon mr={2} icon={faInstagram} color="primary" />
      </A>
      <A href={SocialContacts.youtube} target="_blank" rel="noreferrer">
        <AnimatedIcon mr={2} icon={faYoutube} />
      </A>
      <AnimatedIcon
        onClick={() =>
          setNewsLetterState((curr: any) => ({ ...curr, value: true }))
        }
        mr={2}
        mt={2}
        icon={faNewspaper}
        color="primary"
      />
    </AlignRight>
  )
}
export { SideSocial }
