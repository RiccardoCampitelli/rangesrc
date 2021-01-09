import * as React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import Img from 'gatsby-image'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

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
const IndexPage = () => {
  const { rangesrc, waves } = useStaticQuery(query)

  return (
    <IndexLayout>
      <Img
        imgStyle={{ position: 'fixed' }}
        fluid={waves.childImageSharp.fluid}
      />
      <Page>
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
  )
}

export default IndexPage
