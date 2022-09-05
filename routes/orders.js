const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/orderItems');
const router = express.Router();

 


router.post('/', async (req,res)=>{


    const orderItemsIds =Promise.all(req.body.orderItems.map(async orderItem =>{
        let newOrderItem = new OrderItem({
             service: orderItem.service,
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;





    let order = new  Order({
        orderItems:orderItemsIdsResolved,
        user: req.body.user,
        totalPrice: req.body.totalPrice,
        status: req.body.statuts,
        date: req.body.date,
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
})



module.exports =router;