import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import axios from 'axios';

const EditProduct = () => {
    const state = useContext(GlobalState);
    const [products] = state.productAPI.products;
    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const product = products.find(product => product._id === params.id);
            if (product) setProduct(product);
        }
    }, [params.id, products]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${product._id}`, { ...product });
            window.location.href = '/';


            alert("Product updated successfully!");
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="edit_product">
            <form onSubmit={handleSubmit}>
                <h2>Edit the product :{product.product_id}</h2>
                <input type="text" name="title" value={product.title} onChange={handleChangeInput} />
                <input type="text" name="price" value={product.price} onChange={handleChangeInput} />
                <textarea name="description" value={product.description} onChange={handleChangeInput}></textarea>
                {/* Add more fields as necessary */}
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
