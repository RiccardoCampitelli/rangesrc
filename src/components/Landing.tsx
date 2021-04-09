import React from 'react'
import styled from 'styled-components'
import GatsbyBackgroundImage from 'gatsby-background-image'
import { GatsbyImageFluidProps } from 'gatsby-image'

const BackgroundImage = styled(GatsbyBackgroundImage)`
  width: 100%;
  height: 100vh;

  filter: brightness(50%);
`

const RelativeContainer = styled.div`
  position: relative;
`

interface LandingProps {
  image: GatsbyImageFluidProps
}

const Landing: React.FC<LandingProps> = ({ children, image }) => {
  return (
    <RelativeContainer>
      <BackgroundImage fluid={image.fluid}>{children}</BackgroundImage>
    </RelativeContainer>
  )
}

export default Landing
