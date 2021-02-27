import asyncHandler from 'express-async-handler' //npm i express-async-handler using with promises instead of try & catch
import Product from '../Modals/productModal.js'



//@desc     Fetch all products
//@route    GET /api/products
//@access   public

const getProducts = asyncHandler(async(req,res) => {
    //for search box
    //get keyword from url 
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword, // to get products by few words (auto complete)
            $options: 'i' //not case sensitive
        } 
    } : {}

        const products = await Product.find({...keyword}) //empty curly praces return everything
        res.json(products)
})





//@desc     Fetch single product
//@route    GET /api/product/:id
//@access   public


const getProductById = asyncHandler(async(req,res) => {

    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error ('product not found')
    }
})



export {getProducts, getProductById}