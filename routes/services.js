const {Service} = require('../models/service');
const express = require('express');
const router = express.Router();
const { Category } = require('../models/categories');

 
router.get(`/`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=2342342,234234
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }

    const serviceList = await Service.find(filter).populate('category');

    if(!serviceList) {
        res.status(500).json({success: false})
    } 
    res.send(serviceList);
})

router.put('/:id',async (req, res)=> {

   

    const serv = await Service.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
          },
     )

    if(!serv)
    return res.status(400).send('the service cannot be created!')

    res.send(serv);
})


router.get('/:id', async(req,res)=>{
    const service = await Service.findById(req.params.id);

    if(!service) {
        res.status(500).json({message: 'The Collaborater with the given ID was not found.'})
    } 
    res.status(200).send(service);
}) 

 
router.post('/', async (req,res)=>{


    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    let service = new Service({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category

    })
    service = await service.save();

    if(!service)
    return res.status(400).send('the service cannot be created!')

    res.send(service);
})


router.delete('/:id', (req, res)=>{
    Service.findByIdAndRemove(req.params.id).then(service =>{
        if(service) {
            return res.status(200).json({success: true, message: 'the service is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "service not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await Service.countDocuments()
    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})



module.exports =router;