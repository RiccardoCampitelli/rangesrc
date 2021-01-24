import React from 'react'
import Page from 'src/components/Page'
import IndexLayout from 'src/layouts'
import styled from 'styled-components'
import { Title } from 'src/components/Title'

const Container = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const About = () => {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <Title sticky={false} fontSize={[1, 3, 4]}>
            Coming soon
          </Title>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default About
