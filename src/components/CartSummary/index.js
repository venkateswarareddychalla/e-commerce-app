import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const pricesArray = cartList.map(each => each.price * each.quantity)
        const totalOrderPrice = pricesArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        )
        return (
          <div className="cart-summary-container">
            <div className="cart-summary-card">
              <h1 className="order-total-para">
                Order Total:
                <span className="total-price-span"> Rs {totalOrderPrice}</span>
              </h1>
              {cartList.length > 1 ? (
                <p className="items-in-cart-para">
                  {cartList.length} items in cart
                </p>
              ) : (
                <p className="items-in-cart-para">
                  {cartList.length} item in cart
                </p>
              )}
              <button type="button" className="checkout-button">
                Checkout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
