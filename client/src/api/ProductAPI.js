import { useEffect, useState } from 'react'
import axios from 'axios';

const ProductAPI = () => {

    const[product,setProducts] = useState([])

    const getProducts = async()=>{
        const res = await axios.get('/api/products')
        setProducts(res.data)
    }
 
    useEffect(()=>{
        getProducts()
    },[])

  return {
    products : [product,setProducts]
  }
}

export default ProductAPI