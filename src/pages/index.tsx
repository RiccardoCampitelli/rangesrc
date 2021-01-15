import React, { HTMLProps } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Img, { GatsbyImageFluidProps } from 'gatsby-image'

import IndexLayout from 'src/layouts'
import styled, { keyframes, useTheme } from 'styled-components'
import { AppTheme, getColor } from 'src/styles/theme'
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system'
import Landing from 'src/components/Landing'
import Page from 'src/components/Page'
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
  margin-top: -70vh;
  margin-bottom: 70vh;
  text-align: center;
  color: ${getColor('primary')};
  z-index: 200;
  ${typography};
  animation: ${enterAnimation} 1s ease-in;
`

type DivProps = HTMLProps<HTMLDivElement> &
  FlexboxProps<AppTheme> &
  SpaceProps<AppTheme>
const ContentWrapper: React.FC<DivProps> = styled.div`
  height: auto;
  min-height: 40rem;
  display: flex;
  ${flexbox};
  ${space};
`

type ModifiedImgProps = GatsbyImageFluidProps &
  SpaceProps<AppTheme> &
  LayoutProps<AppTheme>

const ModifiedImg: React.FC<Omit<
  ModifiedImgProps,
  'propTypes' | 'ref'
>> = styled(Img)`
  height: 20%;
  width: 20%;
  ${space};
  ${layout}
`

const IndexPage = () => {
  const { liveToBurn } = useStaticQuery(query)

  return (
    <>
      <IndexLayout>
        <Page>
          <Landing />

          <Title fontSize={[1, 3]}>RANGES RC</Title>
          <Container />
          <Container>
            <ContentWrapper
              flexWrap="wrap"
              flexDirection={['row', 'column']}
              alignItems="center"
              justifyContent="center"
            >
              <ModifiedImg
                size={400}
                m="1rem"
                fluid={liveToBurn.childImageSharp.fluid}
              />
              <ModifiedImg
                size={150}
                m="1rem"
                fluid={liveToBurn.childImageSharp.fluid}
              />
              <ModifiedImg
                size={150}
                m="1rem"
                fluid={liveToBurn.childImageSharp.fluid}
              />
              <ModifiedImg
                size={400}
                m="1rem"
                fluid={liveToBurn.childImageSharp.fluid}
              />
              <ModifiedImg
                size={150}
                m="1rem"
                fluid={liveToBurn.childImageSharp.fluid}
              />
              <ModifiedImg
                size={150}
                m="1rem"
                fluid={liveToBurn.childImageSharp.fluid}
              />
            </ContentWrapper>
          </Container>
        </Page>
      </IndexLayout>
    </>
  )
}

export default IndexPage
