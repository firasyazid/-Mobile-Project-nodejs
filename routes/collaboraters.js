const {Collaborater} = require('../models/collaborater');
const express = require('express');
const router = express.Router();
const { Category } = require('../models/categories');
const multer = require('multer');
 
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
      cb(null, 'public/uploads')
    },

    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
  })

  const uploadOptions = multer({ storage: storage });


 

router.get(`/`, async (req, res) =>{
    const collaboraterList = await Collaborater.find();

    if(!collaboraterList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(collaboraterList);
})


router.get('/:id', async(req,res)=>{
    const collaborater = await Collaborater.findById(req.params.id);

    if(!collaborater) {
        res.status(500).json({message: 'The Collaborater with the given ID was not found.'})
    } 
    res.status(200).send(collaborater);
}) 


router.post('/',uploadOptions.single('image'), async (req,res)=>{
    
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');


    const fileName = req.file.filename
   const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let collaborater = new Collaborater({
        name: req.body.name,
        lastname: req.body.lastname,
        location: req.body.location,
        phone: req.body.phone,
        image:`${basePath}${fileName}` ,
        category: req.body.category,
    })
    collaborater = await collaborater.save();

    if(!collaborater)
    return res.status(400).send('the collaborater cannot be created!')

    res.send(collaborater);
})



router.delete('/:id', (req, res)=>{
    Collaborater.findByIdAndRemove(req.params.id).then(collaborater =>{
        if(collaborater) {
            return res.status(200).json({success: true, message: 'the collaborater is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "collaborater not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})


router.put('/:id',async (req, res)=> {
    const collaborater = await Collaborater.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            lastname: req.body.lastname,
            location: req.body.location,
            phone: req.body.phone,
            image: req.body.image,

        },
        { new: true}
    )

    if(!collaborater)
    return res.status(400).send('the collaborater cannot be created!')

    res.send(collaborater);
})

module.exports =router;