import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  // 1) Remove all cart items
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // 2) Increment cart item quantity
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  // 3) Decrement cart item quantity
  decrementCartItemQuantity = (id, quantity) => {
    if (quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: quantity - 1}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(each => each.id !== id),
      }))
    }
  }

  // 4) Remove cart item
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  //   TODO: Update the code here to implement addCartItem
  // 5) Add cart item
  addCartItem = product => {
    const {cartList} = this.state
    const isProductPresent = cartList.find(each => each.id === product.id)
    if (isProductPresent === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === product.id) {
            return {...each, quantity: each.quantity + product.quantity}
          }
          return each
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
