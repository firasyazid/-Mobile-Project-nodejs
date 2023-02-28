const {CodePromo} = require('../models/codepromo');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let codepromo = new CodePromo({
        codep: req.body.codep,
        isSubmitt: req.body.isSubmitt,
        pourcentage: req.body.pourcentage,

     })
    codepromo = await codepromo.save();

    if(!codepromo)
    return res.status(400).send('the code cannot be created!')

    res.send(codepromo);
})
 
router.get(`/`, async (req, res) =>{
    const CodeList = await CodePromo.find();

    if(!CodeList) {
        res.status(500).json({success: false})
    } 
    res.send(CodeList);


    router.get('/:id', async(req,res)=>{
        const code = await CodePromo.findById(req.params.id) ;
    
        if(!code) {
            res.status(500).json({message: 'The code with the given ID was not found.'})
        } 
        res.status(200).send(code);
    }) 
})

router.put('/:id',async (req, res)=> {
    const code = await CodePromo.findByIdAndUpdate(
        req.params.id,
        {
            codep: req.body.codep,
            isSubmitt: req.body.isSubmitt,
            pourcentage: req.body.pourcentage,

 
        },
        { new: true}
    )

    if(!code)
    return res.status(400).send('the code cannot be created!')

    res.send(code);


     
})
module.exports = router;
