import React from 'react'
import styled from 'styled-components'
import GatsbyBackgroundImage from 'gatsby-background-image'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query {
    forest: file(relativePath: { eq: "background_forest.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const BackgroundImage = styled(GatsbyBackgroundImage)`
  width: 100%;
  height: 100vh;

  filter: brightness(50%);
  -webkit-box-shadow: 5px 5px 50px 15px #000000;
  box-shadow: 5px 5px 50px 15px #000000;
`

const RelativeContainer = styled.div`
  position: relative;
`

const Landing: React.FC = ({ children }) => {
  const { forest } = useStaticQuery(query)

  return (
    <RelativeContainer>
      <BackgroundImage fluid={forest.childImageSharp.fluid}>
        {children}
      </BackgroundImage>
    </RelativeContainer>
  )
}

export default Landing
