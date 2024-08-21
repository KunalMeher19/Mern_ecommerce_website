import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import BtnRender from './BtnRender';

const ProductList = ({ product,isAdmin }) => {
    // const [checked, setChecked] = useState(product.checked);

    // const handleCheckboxChange = (event) => {
    //   setChecked(event.target.checked);
    // };
    return (
        <div>
            <div className='product_card'>
                {/* {isAdmin && <input type='checkbox' checked={checked} onChange={handleCheckboxChange}/>} */}
                <img src={product.images.url} alt='' />
                <div className='product_box'>
                    <h2 title={product.title}>{product.title}</h2>
                    <span>${product.price}</span>
                    <p>{product.description}</p>
                </div>

                <BtnRender product={product} isAdmin={isAdmin}/>
            </div>
        </div>
    );
};

export default ProductList;

