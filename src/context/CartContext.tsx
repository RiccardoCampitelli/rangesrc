import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  Reducer,
  Dispatch
} from 'react'

import Client from 'shopify-buy'

const cartReducer: Reducer<Cart, Action> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKOUT':
      return { ...state, checkout: action.checkout, isAdding: false }

    default:
      return state
  }
}

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id'

const client = Client.buildClient({
  storefrontAccessToken: process.env.STOREFRONT_API_ACCESS_TOKEN ?? '',
  domain: `${process.env.SHOP_NAME}.myshopify.com`
})

function createNewCheckout(cli: Client.Client) {
  return cli.checkout.create()
}

function fetchCheckout(cli: any, id: any) {
  return cli.checkout.fetch(id)
}

interface Cart {
  client: Client.Client
  isAdding: boolean
  checkout: Checkout
}

interface Checkout {
  lineItems: any[]
}

const initialCartState: Cart = {
  client,
  isAdding: false,
  checkout: { lineItems: [] }
}

const CartContext = createContext({
  cart: initialCartState,
  // setCart: () => null,
  dispatch: ((arg: any) => undefined) as Dispatch<Action>
})

type Action = { type: 'UPDATE_CHECKOUT'; checkout: Checkout }

const CartContextProvider = ({ children }: any) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState)

  useEffect(() => {
    const initializeCheckout = async () => {
      const isBrowser = typeof window !== 'undefined'
      const existingCheckoutId = isBrowser
        ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
        : null
      if (existingCheckoutId) {
        try {
          const checkout = await fetchCheckout(client, existingCheckoutId)
          if (!checkout.completedAt) {
            console.log('Checkout fetched from Shopify with id', checkout.id)
            console.log('Checkout contains', checkout.lineItems)
            if (checkout) {
              console.log('Updating checkout in browser')
              dispatch({ type: 'UPDATE_CHECKOUT', checkout })
            }
            // return {
            //   client,
            //   checkout,
            //   isAdding: false
            // }
          }
        } catch {
          console.log(
            'Something went wrong and the checkout key had to be erased'
          )
          localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, '')
        }
      }
      const newCheckout = await createNewCheckout(client)
      localStorage.setItem(
        SHOPIFY_CHECKOUT_STORAGE_KEY,
        newCheckout.id.toString()
      )
      console.log('The new checkout id stored is', newCheckout.id)
      // return {
      //   client,
      //   newCheckout,
      //   isAdding: false
      // }
    }

    initializeCheckout()
  }, [])

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

function useAddItemToCart() {
  const { dispatch, cart } = useContext(CartContext)

  async function addItemToCart(variantId: string, quantity: string) {
    if (variantId === '' || !quantity) {
      console.error('Both a size and quantity are required.')
      return
    }

    const isBrowser = typeof window !== 'undefined'
    const checkoutId = isBrowser
      ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
      : ''

    const lineItemsToAdd: Client.LineItemToAdd[] = [
      { variantId, quantity: parseInt(quantity, 10) }
    ]

    console.log({ checkoutId, lineItemsToAdd })

    const newCheckout = await cart.client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    )

    dispatch({ type: 'UPDATE_CHECKOUT', checkout: newCheckout })
  }

  return addItemToCart
}

function useGoToCheckout() {
  const { cart } = useContext(CartContext)

  return () => {
    window.open(cart.checkout.webUrl)
  }
}

const useCartContext = () => useContext(CartContext)

export {
  CartContextProvider,
  useAddItemToCart,
  useGoToCheckout,
  useCartContext
}
