import asyncHandler from 'express-async-handler' //npm i express-async-handler using with promises instead of try & catch
import Order from '../Modals/orderModal.js'



//@desc     create new order
//@route    POST /api/orders
//@access   private

const addOrderItems = asyncHandler(async(req,res) => {
        const {
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemPrices,  
            shipping,
            totalPrice} = req.body

    if(orderItems && orderItems.length ===0) {
        res.status(400)
        throw new Error ('No Order Items')
    } else {
        const order = new Order ({
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemPrices, 
            shipping,
            totalPrice
        })
        const createdOrder = await order.save()

        res.status(20).json(createdOrder)
    
    }

    
})

//@desc     get order by id
//@route    POST /api/orders/:id
//@access   private

const getOrderById = asyncHandler(async(req,res) => {
   
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error ('order not found')
    }

})

export {addOrderItems, getOrderById}
