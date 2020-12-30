import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Img from 'gatsby-image'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
// import styled from '@emotion/styled'

const query = graphql`
  query {
    rangesrc: file(relativePath: { eq: "rangesrc.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

// const FancyDiv = styled.h1`
//   height: 10rem;
//   width: 4rem;
//   position: sticky;
//   top: 0px;
//   z-index: 111;
//   text-align: center;
//   width: 100%;
//   color: white;
//   margin-top: 10rem;
// `

// try multiple with z index and color

{
  /* <Img fluid={imageQuery.rangesrc.childImageSharp.fluid} /> */
}

const IndexPage = () => {
  const imageQuery = useStaticQuery(query)

  return (
    <IndexLayout>
      <Page>
        <Container>
          {/* <FancyDiv>RANGES RC</FancyDiv> */}
          <Img fluid={imageQuery.rangesrc.childImageSharp.fluid} />
          <Img fluid={imageQuery.rangesrc.childImageSharp.fluid} />
          <Img fluid={imageQuery.rangesrc.childImageSharp.fluid} />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
