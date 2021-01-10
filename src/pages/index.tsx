import React, { HTMLProps, useRef, useState } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import Img from 'gatsby-image'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import styled, { keyframes, useTheme } from 'styled-components'
import Landing from 'src/components/Landing'
import { AppTheme, getColor } from 'src/styles/theme'
import { typography, TypographyProps } from 'styled-system'
import { heights } from 'src/styles/variables'
import { useEventListener } from 'src/hooks/useEventListener'

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
type CustomProps = { isFixed: boolean }

type H1Props = HTMLProps<HTMLHeadElement> &
  TypographyProps<AppTheme> &
  CustomProps

const Title: React.FC<H1Props> = styled.h1<CustomProps>`
  position: ${props => props.isFixed && 'fixed'};
  /* top: ${heights.header}px; */
  /* z-index: 101; */
  top: 0;
  color: ${getColor('primary')};
  /* animation: ${enterAnimation} 2.5s ease-in; */
  z-index: 200;
  ${typography};
`

const RangesRC = () => {
  const { fontSizes } = useTheme()
  const titleRef = useRef<HTMLElement | null>(null)
  const [isAtTop, setIsAtTop] = useState(false)

  const eventHandler = () => {
    const pageYOffset = window.pageYOffset

    const titleOffset = titleRef.current?.offsetTop ?? 0

    if (pageYOffset >= titleOffset) {
      setIsAtTop(true)
    }

    if (pageYOffset < titleOffset) {
      setIsAtTop(false)
    }
  }

  useEventListener('scroll', eventHandler)

  const fontSizesInPx = fontSizes.map(remSize => remSize * 16)

  return (
    <Title
      ref={titleRef}
      isFixed={isAtTop}
      fontSize={[fontSizesInPx[1], fontSizesInPx[2]]}
    >
      RANGES RC
    </Title>
  )
}

const IndexPage = () => {
  const { liveToBurn } = useStaticQuery(query)

  return (
    <>
      <IndexLayout>
        <Page>
          <Landing>
            <RangesRC />
          </Landing>
          <Container>
            <Img fluid={liveToBurn.childImageSharp.fluid} />
          </Container>
        </Page>
      </IndexLayout>
    </>
  )
}

export default IndexPage
