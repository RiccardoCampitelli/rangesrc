import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Page from 'src/components/Page'
import IndexLayout from 'src/layouts'
import styled from 'styled-components'
import Img from 'gatsby-image'
import GatsbyBackgroundImage from 'gatsby-background-image'
import { Title } from 'src/components/Title'
import { SongList } from 'src/components/SongList'

const query = graphql`
  query {
    forest: file(relativePath: { eq: "forest.png" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fog: file(relativePath: { eq: "whitefog.png" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const ParallaxContainer = styled.div`
  position: relative;
  /* width: 100%;
  height: 100vh; */
  flex-grow: 1;
  /* overflow-x: hidden;
  overflow-y: scroll; */
  /* perspective: 1px;
  perspective-origin: 50% 50%; */

  /* background: #000000;
  background: -webkit-linear-gradient(to bottom, #434343, #000000);
  background: linear-gradient(to bottom, #434343, #000000); */
`

const StyledImg = styled(Img)`
  position: absolute;
  transform-origin: 50% 50%;
  width: 100%;
  /* height: 420px;
  height: 840px; */
  transform: translateZ(0px) scale(1);
`

const BackgroundImg = styled(GatsbyBackgroundImage)`
  position: absolute;
  transform-origin: 50% 50%;
  width: 100%;
  height: 100vh;
  /* z-index: 10; */
  /* height: 420px;
  width: 840px; */
  /* transform: translateZ(1px) scale(1);*/
`

const MiddleThing = styled.div`
  position: absolute;
  transform-origin: 50% 50%;
  color: white;
  width: 420px;
  height: 420px;
  top: 500px;
  left: 25vw;
  transform: translateZ(5px) scale(0.75);
`

const Container = styled.div`
  transform-origin: 50% 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  /* margin-top: 30%;
  margin-bottom: 30%; */
  /* transform: translateZ(0.3px) scale(1); */
`

const About = () => {
  const { forest, fog } = useStaticQuery(query)

  return (
    <IndexLayout>
      <Page>
        <ParallaxContainer>
          <Container>
            <Title fontSize={[1, 3, 4]}>RANGES RC</Title>
          </Container>
          <Container>
            <SongList />
          </Container>
        </ParallaxContainer>
      </Page>
    </IndexLayout>
  )
}

export default About
