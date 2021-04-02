import React, { HTMLProps } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImageFluidProps } from 'gatsby-image'
import { flexbox, FlexboxProps, space, SpaceProps } from 'styled-system'
import Song from 'src/components/Song'
import styled from 'styled-components'
import { AppTheme } from 'src/styles/theme'
import { SongList as SongListData } from 'src/data/songs'

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
  {
    allFile(filter: { sourceInstanceName: { eq: "albums" } }) {
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

type DivProps = HTMLProps<HTMLDivElement> &
  FlexboxProps<AppTheme> &
  SpaceProps<AppTheme>

export const ContentWrapper: React.FC<DivProps> = styled.div`
  height: auto;
  min-height: 40rem;
  background-color: inherit;
  display: flex;
  ${flexbox};
  ${space};
`

const SongList = () => {
  const { allFile } = useStaticQuery<AllFileProps>(query)

  const songListData = SongListData.songs.map(
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
    <ContentWrapper
      flexWrap="wrap"
      flexDirection={['column', 'row']}
      alignItems="center"
      justifyContent="center"
    >
      {songListData.map((song, id) => (
        <Song key={song.spotifyLink} index={id} {...song} />
      ))}
    </ContentWrapper>
  )
}

export { SongList }
