import React from 'react'
import { useCartContext, useGoToCheckout } from 'src/context/CartContext'

const Cart = () => {
  const {
    cart: {
      checkout: { lineItems }
    }
  } = useCartContext()

  const goToCheckout = useGoToCheckout()

  return (
    <div>
      <h1>Cart</h1>
      <div>The cart length is {lineItems.length}</div>
      <button type="button" onClick={goToCheckout}>
        Go To Checkout
      </button>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr'
        }}
      >
        {lineItems.map((item: any) => (
          <li
            style={{
              listStyleType: 'none',
              textAlign: 'center'
            }}
          >
            <figure>
              <img
                src={item.variant.image.src}
                style={{
                  width: '100%'
                }}
                alt=""
              />
            </figure>
            <p>{item.title}</p>
            <p>{item.variant.title}</p>
            <p>{item.variant.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Cart }
