import React, { useEffect, useState } from 'react'
import Img, { GatsbyImageFluidProps } from 'gatsby-image'

import styled, { keyframes } from 'styled-components'
import { layout, LayoutProps, space, SpaceProps } from 'styled-system'
import { AppTheme } from 'src/styles/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons'
import useIntersectionObserver from 'src/hooks/useIntersectionObserver'

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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

interface SongContainerProps {
  index: number
}

const DELAY = 0.5

const calculateAnimationDelay = ({ index }: any) => `${DELAY + index * DELAY}s`

const SongContainer = styled.div<SongContainerProps>`
  padding: 1rem 0.5rem;
  /* margin: 0.5rem; */
  background-color: #ebe7e1;
  border-radius: 0.5rem;
  opacity: 0;
  animation: ${fadeIn} 1s forwards ${calculateAnimationDelay};
`

const FixedHeightDiv = styled.div<LayoutProps<AppTheme>>`
  margin: 0.5rem;
  ${layout}
`

interface SongProps {
  image: GatsbyImageFluidProps
  index: number
  spotifyLink: string
  youtubeLink: string
}

const Song: React.FC<SongProps> = ({
  index,
  image,
  spotifyLink,
  youtubeLink
}) => {
  const [ref, { entry }] = useIntersectionObserver()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(current => {
      if (current) return current

      return entry?.isIntersecting ?? false
    })
  }, [entry?.isIntersecting])

  return (
    <FixedHeightDiv ref={ref} height={[300, 390]}>
      {isVisible && (
        <SongContainer index={index}>
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
      )}
    </FixedHeightDiv>
  )
}

export default Song
