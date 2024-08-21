import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../../../GlobalState';

const DeleteProduct = () => {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productAPI.products || [];
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const deleteProduct = async () => {
            try {
                const confirmDelete = window.confirm("Are you sure you want to delete this product?");
                if (confirmDelete) {
                    await axios.delete(`/api/products/${params.id}`);

                    setProducts(products.filter(product => product._id !== params.id));
                    alert("Product deleted successfully!");
                    navigate('/'); 
                } else {
                    navigate('/'); 
                }
            } catch (err) {
                alert(err.response?.data?.msg || "Something went wrong");
                navigate('/'); // Redirect on error
            }
        };

        deleteProduct();
    }, []);

    return null; // No UI needed since this is just for logic
};

export default DeleteProduct;
