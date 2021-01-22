import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import { Footer } from 'src/components/Footer'
import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`

const IndexLayout: React.FC = ({ children }) => {
  const {
    site: { siteMetadata }
  } = useStaticQuery<StaticQueryProps>(query)

  return (
    <LayoutRoot>
      <Helmet
        title={siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: siteMetadata.description
          },
          { name: 'keywords', content: siteMetadata.keywords }
        ]}
      />
      <Header />
      <LayoutMain>{children}</LayoutMain>
      <Footer />
    </LayoutRoot>
  )
}

export default IndexLayout
