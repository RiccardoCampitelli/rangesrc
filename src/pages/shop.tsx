import * as React from 'react'
import { graphql } from 'gatsby'
import { Cart } from 'src/components/Cart/Cart'
import { useAddItemToCart } from 'src/context/CartContext'

import styled from 'styled-components'
import Page from '../components/Page'
import IndexLayout from '../layouts'

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

export const query = graphql`
  {
    allShopifyProduct {
      nodes {
        shopifyId
        id
        handle
        variants {
          id
          shopifyId
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
          variants: [
            {
              id: string
              shopifyId: string
            }
          ]
        }
      ]
    }
  }
}

const Shop = ({ data }: QueryData) => {
  const items = data.allShopifyProduct.nodes

  const addItemToCart = useAddItemToCart()

  return (
    <IndexLayout>
      <Page>
        <Container>
          <Cart />
          {items.map(item => (
            <div>
              {item.handle}{' '}
              <button
                type="button"
                onClick={() => addItemToCart(item.variants[0].shopifyId, '1')}
              >
                add
              </button>
            </div>
          ))}
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default Shop
