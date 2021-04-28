import React from 'react'
import Page from 'src/components/Page'
import {
  useCartContext,
  useGoToCheckout,
  useLineItemUpdate
} from 'src/context/CartContext'
import IndexLayout from 'src/layouts'
import { AppTheme, getColor, getSpace } from 'src/styles/theme'
import styled from 'styled-components'
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
import { Link } from 'gatsby'
import { Icon } from 'src/components/Icon'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin-top: ${getSpace(6)};
  margin-bottom: ${getSpace(6)};

  color: ${getColor('primary')};
`

const Image = styled.img<SpaceProps<AppTheme> & LayoutProps<AppTheme>>`
  ${space}
  ${layout}
  object-fit: contain;
`

const Flex = styled.div<
  FlexboxProps & SpaceProps<AppTheme> & LayoutProps<AppTheme>
>`
  display: flex;
  ${flexbox}
  ${space}
  ${layout}
`

const P = styled.p<TypographyProps & SpaceProps<AppTheme>>`
  ${typography}
  ${space}
`

const Button = styled.button<SpaceProps<AppTheme>>`
  color: black;
  font-weight: bold;
  background-color: ${getColor('primary')};
  border: 1px solid ${getColor('primary')};
  padding: ${getSpace(1)};
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  ${space}
`

const Row = styled.div<FlexboxProps<AppTheme> & SpaceProps<AppTheme>>`
  display: flex;
  ${flexbox}
  ${space}
`

const Checkout = () => {
  const { cart } = useCartContext()
  const goToCheckout = useGoToCheckout()
  const updateLineItems = useLineItemUpdate()

  const lineItems = cart.checkout.lineItems

  const isCartEmpty = lineItems.length === 0

  const totalPrice = lineItems.reduce(
    (acc, curr) => parseFloat(curr.variant.price) * curr.quantity + acc,
    0
  )

  return (
    <IndexLayout>
      <Page>
        <Container>
          {isCartEmpty && <div>Cart is empty!</div>}
          {lineItems.map(lineItem => (
            <Flex
              flex="1 1 auto"
              flexDirection={['column', 'column', 'row']}
              key={lineItem.id}
              width={['100%', '80%', '70%']}
              my={4}
              justifyContent="center"
            >
              <Link to={`/product/${lineItem.variant.product.handle}`}>
                <Image
                  size={['100%', 250, 300]}
                  src={lineItem.variant.image.src}
                  alt={lineItem.title}
                />
              </Link>
              <Flex
                flex="1 1 auto"
                flexDirection={['column']}
                marginLeft={[0, 4]}
                alignContent="center"
                justifyContent="center"
              >
                <P textAlign={['center', 'left']} fontSize={1}>
                  {lineItem.title}
                </P>
                <P textAlign={['center', 'left']}>
                  Variant: <b> {lineItem.variant.title}</b>
                </P>
                <P textAlign={['center', 'left']}>
                  Price: <b>${lineItem.variant.price}</b>
                </P>
                <Row justifyContent={['center', 'left']} alignItems="center">
                  <Icon
                    mr={[3, 4]}
                    icon={faMinus}
                    onClick={() => updateLineItems(lineItem.variant.id, -1)}
                  />
                  <span>{lineItem.quantity}</span>
                  <Icon
                    ml={[3, 4]}
                    icon={faPlus}
                    onClick={() => updateLineItems(lineItem.variant.id, 1)}
                  />
                </Row>
              </Flex>
            </Flex>
          ))}
          {!isCartEmpty && (
            <>
              <P marginTop={4} fontSize={1}>
                Total: ${totalPrice}
              </P>
              <Button type="button" onClick={() => goToCheckout()}>
                Checkout
              </Button>
            </>
          )}
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default Checkout
