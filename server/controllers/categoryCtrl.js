const Category = require('../models/catagoryModel')
const connect = require('../mongoConnect')


const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            // connecting to the database
            let db = await connect()
            const categories = await Category.find()
            res.json(categories)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCategory: async (req, res) => {
        try{
            // connecting to the database
            let db = await connect();
            
            const {name} = req.body;

            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: 'Category already exists'})

            const newCategory = new Category({name})
            await newCategory.save();
            
            res.json({msg:'Category created successfully !!!',newCategory})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteCategory: async (req, res) => {
        try{
            // connecting to the db
            let db = await connect();

            const isThere = await Category.findById(req.params.id);
            if(!isThere) return res.status(400).json({msg: 'Category not found'})

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: 'Category deleted successfully !!!'})

        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateCategory: async (req, res) => {
        try{
            // connecting to the db
            let db = await connect();

            const {name} = req.body;
            const isThere = await Category.findById(req.params.id);
            if(!isThere) return res.status(400).json({msg: 'Category not found'})
            
            await Category.findByIdAndUpdate({_id:req.params.id},{name})

            res.json({msg:'Updated'})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = categoryCtrl;