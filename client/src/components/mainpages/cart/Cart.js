import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;

  console.log([cart])
  

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", fontSize: "4rem", marginTop: "110px" }}>Cart is Empty!!! Enter some products in cart.</h2>
  }
  return (
    <div>
      {
        cart.map(product => (
          <div className='detail_cart'>
            <img src={product.images.url} alt='' />
            <div className='item_detail'>
              <div className='item_row'>
                <h2>{product.title}</h2>
                <h6>{product.product_id}</h6>
              </div>
              <span>${product.price}</span>
              <p>{product.description}</p>
              <p>{product.content}</p>
              <p>Sold:{product.sold}</p>
              <br />
              <Link to='/payment' className='pay'>Buy Now</Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Cart