import React from 'react'
import Page from 'src/components/Page'
import IndexLayout from 'src/layouts'
import styled, { keyframes } from 'styled-components'
import { AppTheme, getColor } from 'src/styles/theme'
import { space, SpaceProps } from 'styled-system'
import { graphql, useStaticQuery } from 'gatsby'
import Landing from 'src/components/Landing'
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
  color: ${getColor('primary')};
  animation: ${enterAnimation} 0.5s ease-in;
  ${space}
`

const P = styled.p`
  text-align: center;
  width: 100%;
`

const query = graphql`
  query {
    canvas: file(relativePath: { eq: "canvas.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const Contact = () => {
  const { canvas } = useStaticQuery(query)
  useDarkTheme()

  return (
    <IndexLayout>
      <Page>
        <Landing image={canvas.childImageSharp} />
        <Title fontSize={[1, 3, 4]}>CONTACT</Title>
        <TextContainer mx={[4, 5, 7]} my={2}>
          <P>For all enquires email allieverwantedmusic@gmail.com</P>
          <P>
            For everything else, come be apart of the Ranges family and connect
            with us on instagram @ranges_rc
          </P>
          <P>
            Location: Wurundjeri Woiwurrung land, Naarm (Yarra Ranges,
            Melbourne), Australia
          </P>
        </TextContainer>
      </Page>
    </IndexLayout>
  )
}

export default Contact
