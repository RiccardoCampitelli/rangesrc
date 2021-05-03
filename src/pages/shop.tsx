import * as React from 'react'
import { graphql } from 'gatsby'
import { ProductGrid } from 'src/components/Cart/ProductGrid'

import { GatsbyImageFluidProps } from 'gatsby-image'
import Page from '../components/Page'
import IndexLayout from '../layouts'

export const query = graphql`
  {
    allShopifyProduct {
      nodes {
        shopifyId
        id
        handle
        title
        variants {
          id
          shopifyId
          title
          price
        }
        images {
          originalSrc
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

interface QueryData {
  data: {
    allShopifyProduct: {
      nodes: [
        {
          shopifyId: string
          id: string
          handle: string
          title: string
          variants: [
            {
              id: string
              shopifyId: string
              title: string
              price: string
            }
          ]
          images: [
            {
              localFile: {
                childImageSharp: {
                  fluid: GatsbyImageFluidProps
                }
              }
            }
          ]
        }
      ]
    }
  }
}

const Shop = ({ data }: QueryData) => {
  return (
    <IndexLayout>
      <Page>
        <ProductGrid products={data.allShopifyProduct.nodes} />
      </Page>
    </IndexLayout>
  )
}

export default Shop
