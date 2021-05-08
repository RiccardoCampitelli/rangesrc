import React from 'react'

import IndexLayout from 'src/layouts'
import Landing from 'src/components/Landing'
import Page from 'src/components/Page'

import { Title } from 'src/components/Title'
import { SongList } from 'src/components/SongList'
import { graphql, useStaticQuery } from 'gatsby'
import { useDarkTheme } from 'src/context/ThemeContext'

const query = graphql`
  query {
    cover: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const IndexPage = () => {
  const { cover } = useStaticQuery(query)
  useDarkTheme()

  return (
    <IndexLayout>
      <Page>
        <Landing image={cover.childImageSharp} />
        <Title fontSize={[1, 3, 4]}>RANGES RC</Title>
        <SongList />
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
