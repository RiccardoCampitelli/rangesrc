import React, { useEffect, useState } from 'react'
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
import { Modal, ModalContent } from 'src/components/Modal'

const ProductTitle = styled.h1<TypographyProps<AppTheme>>`
  color: ${getColor('primary')};
  width: 100%;
  text-align: center;
  margin-top: ${getSpace(3)};
  user-select: none;
  ${typography};
`

const Container = styled.div<SpaceProps<AppTheme> & LayoutProps<AppTheme>>`
  display: flex;
  flex-direction: column;
  ${space}
  ${layout}
`
type ProductImageProps = GatsbyImageFluidProps &
  SpaceProps<AppTheme> &
  LayoutProps<AppTheme>

const ProductImage: React.FC<Omit<
  ProductImageProps,
  'propTypes' | 'ref'
>> = styled(Img)`
  ${space};
  ${layout};
  object-fit: cover;
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
  text-align: center;

  & p > strong {
    color: ${getColor('primary')};
  }
`

const Row = styled.div<
  FlexboxProps<AppTheme> & SpaceProps<AppTheme> & LayoutProps<AppTheme>
>`
  display: flex;
  ${flexbox}
  ${space}
  ${layout}
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

const Warning = styled.p`
  color: ${getColor('negative')};
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 1rem;
`

const ProductPage = ({ data }: QueryData) => {
  const { title, variants, descriptionHtml, shopifyId } = data.shopifyProduct
  const [variantIndex, setVariantIndex] = useState(0)
  const [isAvailable, setIsAvailable] = useState<boolean>()
  const [productModalOpen, setProductModalOpen] = useState(false)
  const currentVariant = variants[variantIndex]
  const {
    cart: {
      checkout: { lineItems },
      client
    }
  } = useCartContext()

  const updateLineItems = useLineItemUpdate()

  const findLineItem = (id: string) => {
    return lineItems.find((lineItem: any) => lineItem.variant.id === id)
  }

  const imageFluid = currentVariant.image.localFile.childImageSharp.fluid

  useEffect(() => {
    const fetchCurrent = async () => {
      const productAvailableQty = async () => {
        const isAvailableQuery = client.graphQLClient.query((root: any) => {
          root.addConnection(
            'products',
            { args: { first: 10 } },
            (product: any) => {
              product.addConnection(
                'variants',
                { args: { first: 99 } },
                (variant: any) => {
                  variant.add('availableForSale')
                }
              )
            }
          )
        })

        const value = await client.graphQLClient.send(isAvailableQuery)
        return value
      }

      const result = await productAvailableQty()

      const products = result.data.products.edges

      const fetchedProduct = products.find((node: any) => {
        return node.node.id === shopifyId
      })

      const fetchedVariant = fetchedProduct.node.variants.edges.find(
        v => v.node.id === currentVariant.shopifyId
      )

      setIsAvailable(fetchedVariant.node.availableForSale)
    }

    fetchCurrent()
  }, [variantIndex])

  const isCurrentVariantAvailable = isAvailable === true

  const moreThanOneVariant = variants.length > 1

  return (
    <IndexLayout>
      <Modal open={productModalOpen} onClick={() => setProductModalOpen(false)}>
        <ModalContent
          width={['100%', '100%', '70%', '50%']}
          onClick={() => setProductModalOpen(false)}
        >
          <ProductImage
            size={['90%']}
            marginX={[0, 2]}
            fluid={imageFluid}
            width={['90%']}
          />
        </ModalContent>
      </Modal>
      <Layout>
        <Container marginTop={6} width={['100%', '80%']}>
          <Row
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Row
              width="100%"
              justifyContent="center"
              onClick={() => setProductModalOpen(true)}
            >
              <ProductImage
                size={['100%', '80%', '100%']}
                marginX={[0, 2]}
                fluid={imageFluid}
                width={['100%', '80%', '50%']}
              />
            </Row>
            <ProductInfo>
              <ProductTitle fontSize={[1, 2]}>{title}</ProductTitle>
              <Text fontSize={1}>${currentVariant.price}</Text>
              <div>
                {moreThanOneVariant && (
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
                )}
              </div>
              <Warning>{isAvailable === false && '⚠️ Out of stock!'}</Warning>
              <Row flexDirection="row" marginBottom={2}>
                <Icon
                  mx={[3, 4]}
                  icon={faMinus}
                  onClick={() =>
                    isCurrentVariantAvailable &&
                    updateLineItems(currentVariant.shopifyId, -1)
                  }
                  color={!isCurrentVariantAvailable ? 'grey' : 'white'}
                />
                <Text>
                  {findLineItem(currentVariant.shopifyId)?.quantity ?? 0}
                </Text>
                <Icon
                  mx={[3, 4]}
                  icon={faPlus}
                  onClick={() =>
                    isCurrentVariantAvailable &&
                    updateLineItems(currentVariant.shopifyId, 1)
                  }
                  color={!isCurrentVariantAvailable ? 'grey' : 'white'}
                />
              </Row>
              <P dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
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
      descriptionHtml: string
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
        product: {
          id: string
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
        product {
          id
        }
      }
    }
  }
`

export default ProductPage
