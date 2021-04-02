import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Img, { GatsbyImageFluidProps } from 'gatsby-image'
import React from 'react'
import {
  useCartContext,
  useGoToCheckout,
  useLineItemUpdate
} from 'src/context/CartContext'
import { AppTheme, getColor, getFontWeight } from 'src/styles/theme'
import styled from 'styled-components'
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system'
import { Icon } from '../Icon'
import { ContentWrapper } from '../SongList'

const LineItem = styled.div<SpaceProps>`
  ${space}

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Figure = styled.figure<SpaceProps>`
  ${space}
`

const ProductFooter = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.span<TypographyProps<AppTheme>>`
  min-width: 2rem;
  text-align: center;
  color: ${getColor('primary')};
  font-weight: ${getFontWeight('bold')};
  text-transform: capitalize;
  ${typography}
`

const ProductImage: React.FC<Omit<
  SongImageProps,
  'propTypes' | 'ref'
>> = styled(Img)`
  ${space};
  ${layout};
`

interface Product {
  shopifyId: string
  id: string
  handle: string
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

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const {
    cart: {
      checkout: { lineItems }
    }
  } = useCartContext()

  const updateLineItems = useLineItemUpdate()

  const goToCheckout = useGoToCheckout()

  console.log({ lineItems })

  const findLineItem = (id: string) => {
    return lineItems.find(lineItem => lineItem.variant.id === id)
  }

  return (
    <ContentWrapper
      flexWrap="wrap"
      flexDirection={['column', 'row']}
      alignItems="center"
      justifyContent="center"
      marginY={[5, 6]}
    >
      {products.map(({ images, variants, handle }) => (
        <LineItem marginX={[0, 2]}>
          <Text fontSize={1}>{handle}</Text>
          <Figure margin={4}>
            <ProductImage
              size={[300, 400]}
              fluid={images[0].localFile.childImageSharp.fluid}
              alt=""
            />
          </Figure>
          <ProductFooter>
            <div>
              <Icon
                mx={[3, 4]}
                icon={faMinus}
                onClick={() => updateLineItems(variants[0].shopifyId, -1)}
                color="white"
              />
              <Text>{findLineItem(variants[0].shopifyId)?.quantity ?? 0}</Text>
              <Icon
                mx={[3, 4]}
                icon={faPlus}
                onClick={() => updateLineItems(variants[0].shopifyId, 1)}
                color="white"
              />
            </div>
            <Text>${variants[0].price}</Text>
          </ProductFooter>
        </LineItem>
      ))}
    </ContentWrapper>
  )
}

export { ProductGrid }
