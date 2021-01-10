import React, { HTMLProps } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import Img from 'gatsby-image'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import styled, { keyframes, useTheme } from 'styled-components'
import Landing from 'src/components/Landing'
import { AppTheme } from 'src/styles/theme'
import { typography, TypographyProps } from 'styled-system'
import { heights } from 'src/styles/variables'

const query = graphql`
  query {
    rangesrc: file(relativePath: { eq: "rangesrc.jpg" }) {
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

// interface Test {
//   a: string
//   b: number
// }

// interface OmittedTest extends Omit<Test, 'a'> {}

// interface H1KnownProps extends React.RefAttributes<any> {}

// export interface H1Props
//   extends React.RefAttributes<any>,
//     Omit<React.HTMLProps<HTMLHeadElement>, keyof React.RefAttributes<any>> {}

type H1Props = HTMLProps<HTMLHeadElement> & TypographyProps<AppTheme>

const RangesRC: React.FC<H1Props> = styled.h1`
  position: sticky;
  top: ${heights.header}px;
  /* z-index: 101; */

  /* animation: ${enterAnimation} 2.5s ease-in; */
  z-index: 200;
  ${typography};
`

const IndexPage = () => {
  const { rangesrc } = useStaticQuery(query)
  const { fontSizes } = useTheme()

  const fontSizesInPx = fontSizes.map(remSize => remSize * 16)

  return (
    <>
      <IndexLayout>
        <Page>
          <Landing>
            <RangesRC fontSize={[fontSizesInPx[1], fontSizesInPx[2]]}>
              RANGES RC
            </RangesRC>
          </Landing>
          <Container>
            <Img fluid={rangesrc.childImageSharp.fluid} />
            <Img
              fadeIn={true}
              durationFadeIn={1000}
              fluid={rangesrc.childImageSharp.fluid}
            />
            <Link to="/">Take me back home.</Link>
            <Link to="/shop">Let me buy some merch!</Link>
            <Link to="/page-2">page two!</Link>
          </Container>
        </Page>
      </IndexLayout>
    </>
  )
}

export default IndexPage
