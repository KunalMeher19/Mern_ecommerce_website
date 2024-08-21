import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState';

const DetailProduct = () => {

    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productAPI.products;
    const [detailProduct,setDetailProduct] = useState([]);


    useEffect(()=>{
        if(params){
            products.forEach(product => {
                if(product._id === params.id){
                    setDetailProduct(product)
                }
            });
        }
    },[params,products])


    if(detailProduct.length === 0) return null;

  return (
    <div className='detail'>
        <img src={detailProduct.images.url} alt=''/>
        <div className='box_detail'>
            <div className='row'>
                <h2>{detailProduct.title}</h2>
                <h6>{detailProduct.product_id}</h6>
                <p>${detailProduct.price}</p>
                <span>{detailProduct.description}</span>
                <span>{detailProduct.content}</span>
                <span>Sold:{detailProduct.sold}</span>
                <br/>               
                <Link to='/cart' className='cart'>Buy Now</Link>
            </div>
        </div>
    </div>
  )
}
export default DetailProduct