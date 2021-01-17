import React from 'react'
import Img, { GatsbyImageFluidProps } from 'gatsby-image'

import styled from 'styled-components'
import { layout, LayoutProps, space, SpaceProps } from 'styled-system'
import { AppTheme, getColor } from 'src/styles/theme'
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
  /* color: ${getColor('brandYoutube')}; */
`

const SongContainer = styled.div`
  padding: 1rem 0.5rem;
  margin: 0.5rem;
  background-color: #ebe7e1;
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
      <SongImage size={[200, 300]} marginX={2} fluid={image.fluid} />
      <IconContainer>
        <div>
          <a href={spotifyLink} target="_blank" rel="noreferrer">
            <Icon icon={faSpotify} size="2x" color="#1DB954" />
          </a>
        </div>
        <div>
          <a href={youtubeLink} target="_blank" rel="noreferrer">
            <Icon icon={faYoutube} size="2x" color="#ff0101" />
          </a>
        </div>
      </IconContainer>
    </SongContainer>
  )
}

export default Song
