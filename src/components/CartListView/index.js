import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickRemoveAll = () => {
        removeAllCartItems()
      }
      return (
        <>
          <div className="remove-all-container">
            <button
              type="button"
              onClick={onClickRemoveAll}
              className="remove-all-button"
            >
              Remove All
            </button>
          </div>
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
