const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/orderItems');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

router.get(`/:id`, async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'service'} 
        });

    if(!order) {
        res.status(500).json({success: false})
    } 
    res.send(order);
})


router.post('/', async (req,res)=>{


    const orderItemsIds =Promise.all(req.body.orderItems.map(async orderItem =>{
        let newOrderItem = new OrderItem({
             service: orderItem.service,
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('service', 'price');
        const totalPrice = orderItem.service.price;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);


    let order = new Order({
        orderItems:orderItemsIdsResolved,
        user: req.body.user,
        totalPrice: totalPrice,
        status: req.body.status,
        date: req.body.date,
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
})


router.put('/:id',async (req, res)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return res.status(400).send('the order cannot be update!')

    res.send(order);
})

router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
           
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})


router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}) .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'service'} 
        });
        
    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
})

module.exports =router;