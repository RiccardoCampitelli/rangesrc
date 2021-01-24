import React from 'react'

import IndexLayout from 'src/layouts'
import Landing from 'src/components/Landing'
import Page from 'src/components/page'

import { Title } from 'src/components/Title'
import { SongList } from 'src/components/SongList'

const IndexPage = () => {
  return (
    <IndexLayout>
      <Page>
        <Landing />
        <Title sticky fontSize={[1, 3, 4]}>
          RANGES RC
        </Title>
        <SongList />
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
