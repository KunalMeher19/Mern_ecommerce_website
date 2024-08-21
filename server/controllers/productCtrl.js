const Products = require('../models/productModel')
const connect = require('../mongoConnect')


// filter,sorting and pagination

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryCopy = { ...this.queryString };

        // delete fields that are not allowed
        const removeFields = ['page', 'sort', 'limit'];
        removeFields.forEach((removeField) => delete (queryCopy[removeField]));

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)


        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {

            // connect to the db
            let conn = await connect()

            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().pagination()
            const products = await features.query

            res.json(products)


        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            // connect to the db
            let conn = await connect()
            const { product_id, title, price, description, content, images, category } = req.body;

            if (!images) return res.status(400).json({ msg: 'No Image Uploaded' })

            const product = await Products.findOne({ product_id })
            if (product) return res.status(400).json({ msg: 'Product Already Exists' })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save()

            res.json({ msg: 'Product created successful !', newProduct })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            // connect to the db
            let conn = await connect()

            const isthere = await Products.findById(req.params.id);
            if (!isthere) return res.status(404).json({ msg: 'Product Not Found' })

            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: 'Product deleted successful !' })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            // connect to the db
            let conn = await connect()

            const { title, price, description, content, images, category } = req.body;

            if (!images) return res.status(500).json({ msg: 'No image is uploaded' })

            const isthere = await Products.findById(req.params.id);
            if (!isthere) return res.status(404).json({ msg: 'Product Not Found' });

            await Products.findByIdAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({ msg: "Updated the product" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = productCtrl;