import React from 'react'
import Page from 'src/components/Page'
import IndexLayout from 'src/layouts'
import styled, { keyframes } from 'styled-components'
import { AppTheme, getColor, getSpace } from 'src/styles/theme'
import { layout, LayoutProps, space, SpaceProps } from 'styled-system'

const Container = styled.div<SpaceProps<AppTheme> & LayoutProps<AppTheme>>`
  color: white;
  display: flex;
  align-items: center;
  margin-top: ${getSpace(6)};
  flex-direction: column;
  width: 100%;
  height: 100vh;
  ${space}
  ${layout}
`

const H1 = styled.h1`
  color: ${getColor('primary')};
  margin-top: ${getSpace(3)};
  margin-bottom: ${getSpace(5)};
`

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
  ${space}
`

const P = styled.p`
  text-align: left;
  width: 100%;
`

const About = () => {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <TextContainer mx={[4, 7]}>
            <H1>About Us</H1>
            <P>RANGES RC (RANGES RECORDS / RRC)</P>
            <P>
              Established in 2020, SAD SOB + CROSLEY make up the rap duo from
              Naarm (Melbourne) Australia, with a sound built off biographical
              music, where life, ethics, bonds, home, art and craftsmanship are
              the pillars.
            </P>
            <P>
              RRC forms the heart of SAD SOB + CROSLEY’s fully-independent, self
              run operation allieverwantedmusic. Music made for us, sounds to
              live by.
            </P>
            <P>
              THIS IS ART ,THIS IS MELBOURNE, RANGES IS A FAMILY, BLESS! - SOB +
              CROS
            </P>
            <H1>Contact</H1>
            <P>
              For all general, shop, business and booking enquires email
              allieverwantedmusic@gmail.com
            </P>
            <P>
              For everything else, come be apart of the Ranges family and
              connect with us on instagram @ranges_rc
            </P>
            <P>
              Location: Wurundjeri Woiwurrung land, Naarm (Yarra Ranges,
              Melbourne), Australia
            </P>
          </TextContainer>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default About
