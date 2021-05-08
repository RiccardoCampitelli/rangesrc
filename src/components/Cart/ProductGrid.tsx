import Img, { GatsbyImageFluidProps } from 'gatsby-image'
import React from 'react'
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
import { Link as GatsbyLink } from 'gatsby'
import { ContentWrapper } from '../SongList'

const LineItem = styled.div<SpaceProps & LayoutProps<AppTheme>>`
  ${space}
  ${layout}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
  user-select: none;
  ${typography}
`

const Link = styled(GatsbyLink)<LayoutProps>`
  &:hover {
    text-decoration: none;
  }

  ${layout}
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

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <ContentWrapper flexDirection="column" paddingTop={5}>
      <Text fontSize={[1, 2]}>SHOP</Text>
      <ContentWrapper
        flexWrap="wrap"
        flexDirection={['column', 'row']}
        alignItems="baseline"
        justifyContent="center"
        marginBottom={[5, 6]}
      >
        {products.map(({ images, variants, handle, id, title }) => (
          <LineItem width={['100%', 300, 400]} marginX={[0, 2]} key={id}>
            <Link width={['100%', 300, 400]} to={`/product/${handle}`}>
              <Figure marginY={4}>
                <ProductImage
                  size={['100%', 300, 400]}
                  fluid={images[0].localFile.childImageSharp.fluid}
                  alt=""
                />
              </Figure>
            </Link>
            <ProductFooter>
              <Text fontSize={1}>{title}</Text>
              <Text>${variants[0].price}</Text>
            </ProductFooter>
          </LineItem>
        ))}
      </ContentWrapper>
    </ContentWrapper>
  )
}

export { ProductGrid }
