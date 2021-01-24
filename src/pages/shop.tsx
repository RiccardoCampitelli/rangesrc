import * as React from 'react'

import { Title } from 'src/components/Title'
import styled from 'styled-components'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const Container = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Shop = () => (
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

export default Shop
