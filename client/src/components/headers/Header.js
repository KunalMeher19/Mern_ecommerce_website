import React, { useContext } from 'react'
import logoImage from '../images/logo.png'
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const Header = () => {

    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart, setCart] = state.userAPI.cart;

    const logoutUser = async()=>{
        const confirmation = window.confirm("Do you want to log Out ?")
        if(confirmation){
            try{
                await axios.get('/user/logout')
                localStorage.clear()
                setIsLogged(false)
                setIsAdmin(false)
                setCart([])
            }
            catch(err){
                alert(err.message)
            }
        }
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Products</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Log Out</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className='menu'>
                <MdOutlineMenu size={30} />
            </div>

            <div className='logo'>
                <Link to='/'>{isAdmin ? <h2 style={{margin:"15px"}}>ADMIN</h2> : <img src={logoImage} alt='Logo' />}</Link>
            </div>

            <ul>
                <li><Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to='/login'>Login or Register</Link></li>
                }

                <li>
                    <MdClose size={30} className='menu' />
                </li>
            </ul>

            {
                isAdmin ? '' : <div className='cart-icon'>
                    <span>{cart.length}</span>
                    <Link to={'/cart'}>
                    <MdOutlineAddShoppingCart size={30} />
                    </Link>
                </div>
            }


        </header>
    )
}

export default Header