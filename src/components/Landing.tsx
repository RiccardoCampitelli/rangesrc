import React from 'react'
import styled from 'styled-components'
import GatsbyBackgroundImage from 'gatsby-background-image'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query {
    waves: file(relativePath: { eq: "waves.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const BackgroundImage = styled(GatsbyBackgroundImage)`
  display: block;
  flex: 1;
  flex-direction: column;
  position: relative;
  margin-bottom: 3rem;
  padding-top: 5rem;
`

const Landing: React.FC = ({ children }) => {
  const { waves } = useStaticQuery(query)

  return (
    <BackgroundImage fluid={waves.childImageSharp.fluid}>
      {children}
    </BackgroundImage>
  )
}

export default Landing
