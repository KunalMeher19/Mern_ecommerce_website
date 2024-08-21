import React from 'react'
import Product from './products/Product'
import Login from './login/Login'
import Register from './login/Register'
import Cart from './cart/Cart'
import { Routes, Route } from 'react-router-dom'
import DetailProduct from './utils/DetailProduct/DetailProduct'
import EditProduct from './utils/productList/EditProduct'
import DeleteProduct from './utils/productList/DeleteProduct'
import CreateProduct from './products/CreateProduct'

const Pages = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/detail/:id' element={<DetailProduct/>} />
          <Route path='/product/:id' element={<EditProduct/>} />
          <Route path='/delete/:id'  element={<DeleteProduct/>} />
          <Route path='/create_product'  element={<CreateProduct/>} />
        </Routes>
    </div>
  )
}

export default Pages