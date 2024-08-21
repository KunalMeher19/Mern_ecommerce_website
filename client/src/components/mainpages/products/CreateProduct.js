import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const state = useContext(GlobalState);
    const token = state.token;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_id: '',
        title: '',
        price: 0,
        description: '',
        content: '',
        category: '',
        images: null
    });

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return alert("File not exist.");

            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/api/upload', formData, {
                headers: {
                    Authorization: token 
                }
            });

            setProduct({ ...product, images: res.data });
            navigate('/'); 
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!product.images) return alert("No Image Uploaded");

            await axios.post('/api/products', { ...product }, {
                headers: { Authorization: token }
            });

            alert('Product Created Successfully');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className='create-products'>
            <form onSubmit={handleSubmit}>
                <input type="text" name='product_id' placeholder="Product ID" value={product.product_id} onChange={handleChangeInput} />
                <input type="text" name='title' placeholder="Product Name" value={product.title} onChange={handleChangeInput} />
                <input type="number" name='price' placeholder="Product Price" value={product.price} onChange={handleChangeInput} />
                <textarea name='description' placeholder="Product Description" value={product.description} onChange={handleChangeInput}></textarea>
                <textarea name='content' placeholder="Product Content" value={product.content} onChange={handleChangeInput}></textarea>
                <input type="text" name='category' placeholder="Product Category" value={product.category} onChange={handleChangeInput} />
                <input type="file" name='file' onChange={handleUpload} />
                <button type="submit">Create Product</button>
            </form>
        </div>
    )
}

export default CreateProduct;
