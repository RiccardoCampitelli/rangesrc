import React from 'react'
import Page from 'src/components/Page'
import { useCartContext, useGoToCheckout } from 'src/context/CartContext'
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

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin-top: ${getSpace(6)};

  color: ${getColor('primary')};
`

const Image = styled.img<SpaceProps<AppTheme> & LayoutProps<AppTheme>>`
  ${space}
  ${layout}
  object-fit: contain;
`

const Flex = styled.div<FlexboxProps & SpaceProps<AppTheme>>`
  display: flex;
  ${flexbox}
  ${space}
`

const P = styled.p<TypographyProps>`
  ${typography}
`

const Button = styled.button`
  color: black;
  font-weight: bold;
  background-color: ${getColor('primary')};
  border: 1px solid ${getColor('primary')};
  padding: ${getSpace(1)};
  border-radius: 5px;
  cursor: pointer;
`

const Checkout = () => {
  const { cart } = useCartContext()
  const goToCheckout = useGoToCheckout()

  const lineItems = cart.checkout.lineItems

  console.log({ lineItems })

  const isCartEmpty = lineItems.length === 0

  const totalPrice = lineItems.reduce(
    (acc, curr) => parseFloat(curr.variant.price) * curr.quantity + acc,
    0
  )

  console.log({ totalPrice })

  return (
    <IndexLayout>
      <Page>
        <Container>
          {isCartEmpty && <div>Cart is empty!</div>}
          {lineItems.map(lineItem => {
            return (
              <Flex
                flex="1 1 auto"
                flexDirection={['column', 'column', 'row']}
                key={lineItem.id}
              >
                <Image
                  size={[200, 300]}
                  src={lineItem.variant.image.src}
                  alt={lineItem.title}
                />
                <Flex
                  flex="1 1 auto"
                  flexDirection={['column']}
                  marginLeft={[0, 4]}
                  alignContent="center"
                  justifyContent="center"
                >
                  <P fontSize={1}>{lineItem.title}</P>
                  <P>
                    Price: <b>${lineItem.variant.price}</b>
                  </P>
                  <P>
                    Qty: <b>{lineItem.quantity}</b>
                  </P>
                </Flex>
              </Flex>
            )
          })}
          {!isCartEmpty && (
            <>
              <P fontSize={1}>Total: ${totalPrice}</P>
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
