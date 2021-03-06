import React from 'react'
import Page from 'src/components/Page'
import IndexLayout from 'src/layouts'
import styled, { keyframes } from 'styled-components'
import { AppTheme, getColor } from 'src/styles/theme'
import { space, SpaceProps } from 'styled-system'
import Landing from 'src/components/Landing'
import { graphql, useStaticQuery } from 'gatsby'
import { Title } from 'src/components/Title'
import { useDarkTheme } from 'src/context/ThemeContext'

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

const TextContainer = styled.section<SpaceProps<AppTheme>>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
  animation: ${enterAnimation} 0.5s ease-in;
  color: ${getColor('primary')};
  ${space};
`

const P = styled.p`
  text-align: center;
  width: 100%;
`
const query = graphql`
  query {
    graffiti: file(relativePath: { eq: "graffiti.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const About = () => {
  const { graffiti } = useStaticQuery(query)
  useDarkTheme()

  return (
    <IndexLayout>
      <Page>
        <Landing image={graffiti.childImageSharp} />
        <Title fontSize={[1, 3, 4]}>ABOUT</Title>
        <TextContainer mx={[4, 5, 7]} my={2}>
          <P>RANGES RC (RANGES RECORDS / RRC)</P>
          <P>
            Established in 2020, SAD SOB + CROSLEY make up the rap duo from
            Naarm (Melbourne) Australia, with a sound built off biographical
            music, where life, ethics, bonds, home, art and craftsmanship are
            the pillars.
          </P>
          <P>
            RRC forms the heart of SAD SOB + CROSLEY’s fully-independent, self
            run operation allieverwantedmusic. Music made for us, sounds to live
            by.
          </P>
          <P>
            <i>
              THIS IS ART, THIS IS MELBOURNE, RANGES IS A FAMILY, BLESS! - SOB +
              CROS
            </i>
          </P>
        </TextContainer>
      </Page>
    </IndexLayout>
  )
}

export default About
