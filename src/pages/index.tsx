import React, { HTMLProps } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Img from 'gatsby-image'

import IndexLayout from 'src/layouts'
import styled, { keyframes, useTheme } from 'styled-components'
import { AppTheme, getColor } from 'src/styles/theme'
import { typography, TypographyProps } from 'styled-system'
import Landing from 'src/components/Landing'
import Container from '../components/Container'

const query = graphql`
  query {
    liveToBurn: file(relativePath: { eq: "livetoburn.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    waves: file(relativePath: { eq: "waves.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

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
  top: 0;
  text-align: center;
  color: ${getColor('primary')};
  z-index: 200;
  ${typography};
`

const RangesRC = () => {
  const { fontSizes } = useTheme()

  const fontSizesInPx = fontSizes.map(remSize => remSize * 16)

  return (
    <Title fontSize={[fontSizesInPx[1], fontSizesInPx[2]]}>RANGES RC</Title>
  )
}

const IndexPage = () => {
  const { liveToBurn } = useStaticQuery(query)

  return (
    <>
      <IndexLayout>
        <Landing>
          <RangesRC />
          {/* <Landing></Landing> */}
          <Container>
            <Img fluid={liveToBurn.childImageSharp.fluid} />
          </Container>
        </Landing>
      </IndexLayout>
    </>
  )
}

export default IndexPage
