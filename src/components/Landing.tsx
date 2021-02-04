import React from 'react'
import styled from 'styled-components'
import GatsbyBackgroundImage from 'gatsby-background-image'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query {
    forest: file(relativePath: { eq: "forest_resized.jpg" }) {
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
  box-shadow: 5px 10px 40px 5px rgba(0, 0, 0, 0.99),
    5px 10px 45px 35px rgba(0, 0, 0, 0.6), 5px 10px 50px 50px rgba(0, 0, 0, 0.4);
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
