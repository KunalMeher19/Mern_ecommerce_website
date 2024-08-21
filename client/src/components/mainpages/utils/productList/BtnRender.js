import React, { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

const BtnRender = ({product,isAdmin}) => {
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;
    const [cart, setCart] = state.userAPI.cart;
    return (
        <div className='row_btn'>
            {isAdmin ? (
                <>
                    <Link to={`/delete/${product._id}`} className='btn_buy'>
                        <button className='buy'>Delete</button>
                    </Link>
                    <Link className='btn_view' to={`/product/${product._id}`}>
                        <button className='view'>Edit</button>
                    </Link>
                </>
            ) : (
                <>
                    <Link to={'#!'} className='btn_buy' onClick={() => {
                        addCart(product);
                        // setCart([...cart, product]);
                    }}>
                        <button className='buy'>Buy</button>
                    </Link>
                    <Link className='btn_view' to={`/detail/${product._id}`}>
                        <button className='view'>View</button>
                    </Link>
                </>
            )}
        </div>
    )
}

export default BtnRender