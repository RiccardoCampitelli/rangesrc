import React, { useState } from 'react'
import { graphql } from 'gatsby'
import IndexLayout from 'src/layouts'
import styled from 'styled-components'
import Img, { GatsbyImageFluidProps } from 'gatsby-image'
import { AppTheme, getColor, getFontWeight, getSpace } from 'src/styles/theme'
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system'
import { useCartContext, useLineItemUpdate } from 'src/context/CartContext'
import { Icon } from 'src/components/Icon'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const ProductTitle = styled.h1<TypographyProps<AppTheme>>`
  color: ${getColor('primary')};
  width: 100%;
  text-align: center;
  margin-top: ${getSpace(3)};
  ${typography};
`

const Container = styled.div<SpaceProps<AppTheme> & LayoutProps<AppTheme>>`
  display: flex;
  flex-direction: column;
  ${space}
  ${layout}
`
type SongImageProps = GatsbyImageFluidProps &
  SpaceProps<AppTheme> &
  LayoutProps<AppTheme>

const ProductImage: React.FC<Omit<
  SongImageProps,
  'propTypes' | 'ref'
>> = styled(Img)`
  ${space};
  ${layout};
`

const Text = styled.p<TypographyProps<AppTheme>>`
  min-width: 2rem;
  text-align: center;
  color: ${getColor('primary')};
  font-weight: ${getFontWeight('bold')};
  ${typography}
`

const Layout = styled.div`
  display: flex;
  flex: 1 1 auto;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const P = styled.p`
  color: ${getColor('primary')};
`

const Row = styled.div<FlexboxProps<AppTheme>>`
  display: flex;
  ${flexbox}
`

const ProductInfo = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  align-items: center;
`

const Select = styled.select`
  padding: ${getSpace(1)};
  border-radius: 5px;

  font-weight: bold;

  background-color: transparent;
  text-transform: capitalize;
  color: ${getColor('primary')};
  border: 1px solid ${getColor('primary')};

  margin-top: ${getSpace(1)};
  margin-bottom: ${getSpace(2)};

  &:focus {
    outline: none;
  }
`

const ProductPage = ({ data }: QueryData) => {
  const { title, variants, description } = data.shopifyProduct
  const [variantIndex, setVariantIndex] = useState(0)
  const currentVariant = variants[variantIndex]
  const {
    cart: {
      checkout: { lineItems }
    }
  } = useCartContext()

  const updateLineItems = useLineItemUpdate()

  const findLineItem = (id: string) => {
    return lineItems.find((lineItem: any) => lineItem.variant.id === id)
  }

  const imageFluid = currentVariant.image.localFile.childImageSharp.fluid

  return (
    <IndexLayout>
      <Layout>
        <Container marginTop={6} width={['100%', '80%']}>
          <Row flexDirection={['column', 'row']}>
            <ProductImage
              size={['100%', 500]}
              marginX={[0, 2]}
              fluid={imageFluid}
            />
            <ProductInfo>
              <ProductTitle fontSize={[1, 2]}>{title}</ProductTitle>
              <Text fontSize={1}>${currentVariant.price}</Text>
              <div>
                <Select
                  value={variantIndex}
                  onChange={evt =>
                    setVariantIndex(parseInt(evt.target.value, 10))
                  }
                >
                  {variants.map((variant, idx) => (
                    <option key={variant.id} value={idx}>
                      {variant.title}
                    </option>
                  ))}
                </Select>
              </div>
              <Row flexDirection="row">
                <Icon
                  mx={[3, 4]}
                  icon={faMinus}
                  onClick={() => updateLineItems(currentVariant.shopifyId, -1)}
                  color="white"
                />
                <Text>
                  {findLineItem(currentVariant.shopifyId)?.quantity ?? 0}
                </Text>
                <Icon
                  mx={[3, 4]}
                  icon={faPlus}
                  onClick={() => updateLineItems(currentVariant.shopifyId, 1)}
                  color="white"
                />
              </Row>
              <P>{description}</P>
            </ProductInfo>
          </Row>
        </Container>
      </Layout>
    </IndexLayout>
  )
}

interface QueryData {
  data: {
    shopifyProduct: {
      id: string
      title: string
      handle: string
      description: string
      shopifyId: string
      variants: {
        id: string
        title: string
        price: string
        availableForSale: boolean
        shopifyId: string
        image: {
          localFile: {
            childImageSharp: GatsbyImageFluidProps
          }
        }
      }[]
    }
  }
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
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

export default ProductPage
