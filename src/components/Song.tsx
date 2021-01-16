import React from 'react'
import Img, { GatsbyImageFluidProps } from 'gatsby-image'

import styled from 'styled-components'
import { layout, LayoutProps, space, SpaceProps } from 'styled-system'
import { AppTheme } from 'src/styles/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons'

type SongImageProps = GatsbyImageFluidProps &
  SpaceProps<AppTheme> &
  LayoutProps<AppTheme>

const SongImage: React.FC<Omit<SongImageProps, 'propTypes' | 'ref'>> = styled(
  Img
)`
  border-radius: 0.5rem;
  ${space};
  ${layout};
`

const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 700;
`

const SongContainer = styled.div`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: papayawhip;
  border-radius: 0.5rem;
`

interface SongProps {
  image: GatsbyImageFluidProps
  spotifyLink: string
  youtubeLink: string
}

const Song: React.FC<SongProps> = ({ image, spotifyLink, youtubeLink }) => {
  return (
    <SongContainer>
      <SongImage size={200} marginX={2} fluid={image.fluid} />
      <IconContainer>
        <div>
          <Icon icon={faSpotify} size="2x" />
        </div>
        <div>
          <Icon icon={faYoutube} size="2x" />
        </div>
      </IconContainer>
    </SongContainer>
  )
}

export default Song
