import Img, { GatsbyImageFluidProps } from 'gatsby-image'
import React from 'react'
import { AppTheme, getColor, getFontWeight } from 'src/styles/theme'
import styled from 'styled-components'
import {
  layout,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system'
import { Link as GatsbyLink } from 'gatsby'
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
  flex-direction: column;
`

const Text = styled.span<TypographyProps<AppTheme>>`
  min-width: 2rem;
  text-align: center;
  color: ${getColor('primary')};
  font-weight: ${getFontWeight('bold')};
  text-transform: capitalize;
  ${typography}
`

const Link = styled(GatsbyLink)`
  &:hover {
    text-decoration: none;
  }
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
  return (
    <ContentWrapper flexDirection="column" paddingTop={5}>
      <Text fontSize={2}>Shop</Text>
      <ContentWrapper
        flexWrap="wrap"
        flexDirection={['column', 'row']}
        alignItems="center"
        justifyContent="center"
        marginBottom={[5, 6]}
      >
        {products.map(({ images, variants, handle, id }) => (
          <LineItem marginX={[0, 2]} key={id}>
            <Link to={`/product/${handle}`}>
              <Figure margin={4}>
                <ProductImage
                  size={[300, 400]}
                  fluid={images[0].localFile.childImageSharp.fluid}
                  alt=""
                />
              </Figure>
              <ProductFooter>
                <Text fontSize={1}>{handle}</Text>
                <Text>${variants[0].price}</Text>
              </ProductFooter>
            </Link>
          </LineItem>
        ))}
      </ContentWrapper>
    </ContentWrapper>
  )
}

export { ProductGrid }
