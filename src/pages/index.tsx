import React, { HTMLProps } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { GatsbyImageFluidProps } from 'gatsby-image'

import IndexLayout from 'src/layouts'
import styled, { keyframes } from 'styled-components'
import { AppTheme, getColor, getLetterSpacing } from 'src/styles/theme'
import {
  flexbox,
  FlexboxProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system'
import Landing from 'src/components/Landing'
import Page from 'src/components/Page'
import Song from 'src/components/Song'
import { SongList } from 'src/data/songs'
import Container from 'src/components/Container'

interface AllFileProps {
  allFile: {
    edges: [
      {
        node: {
          relativePath: string
          childImageSharp: GatsbyImageFluidProps
        }
      }
    ]
  }
}

const query = graphql`
  query {
    allFile(filter: { internal: { mediaType: { regex: "images/" } } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
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
  font-family: 'Passion One';
  font-weight: 900;
  letter-spacing: ${getLetterSpacing('tracked')};
  top: 0;
  margin-top: -70vh;
  margin-bottom: 70vh;
  text-align: center;
  color: ${getColor('primary')};
  z-index: 200;
  padding-top: 1rem;
  animation: ${enterAnimation} 1s ease-in;
  ${typography};
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

const IndexPage = () => {
  const { allFile } = useStaticQuery<AllFileProps>(query)

  const songListData = SongList.songs.map(
    ({ imageName, spotifyLink, youtubeLink }) => {
      const image = allFile.edges.find(
        ({ node }) => node.relativePath === imageName
      )

      return {
        image: image?.node.childImageSharp as GatsbyImageFluidProps,
        spotifyLink,
        youtubeLink
      }
    }
  )

  return (
    <>
      <IndexLayout>
        <Page>
          <Landing />
          <Title fontSize={[1, 4]}>RANGES RC</Title>
          <Container>
            <ContentWrapper
              flexWrap="wrap"
              flexDirection={['column', 'row']}
              alignItems="center"
              justifyContent="center"
            >
              {songListData.map((song, id) => (
                <Song key={id} {...song} />
              ))}
            </ContentWrapper>
          </Container>
        </Page>
      </IndexLayout>
    </>
  )
}

export default IndexPage
