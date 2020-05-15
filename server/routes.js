const express = require('express')
const router = express.Router()
const Image = require('./models/Image')

router.get('/', (req, res, next)=>{
    Image.find().then(images => {
        res.json({images})
    }).catch(err => console.error(err))
})

//http://localhost:5000/add-image


router.post('/add-image', (req, res, next) => {

    console.log(req.body)


    Image.create(req.body).then(img => {
        res.json(img)
    }).catch(err => console.error(err))
})




//let image = await Axios.get(`http://localhost:5000/getImage?imageId=${this.props.match.params.id}`)



router.get('/getImage', (req, res, next) => {
    Image.findById(req.query.imageId).then(img => {
        res.json(img)
    }).catch(err => console.error(err))
})



router.post('/addColor', (req, res, next) => {
    Image.findById(req.query.imageId).then(img => {
        console.log(img, req.body, '?????')
        img.colors.push(req.body.color)
        console.log('image',img)
        img.save((err,doc)=>{
            console.log(err, doc)
            res.json(doc)
        })
    })

})  






// include CLOUDINARY:
const uploader = require('./cloudinary-setup');
 
router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    // console.log('file is: ', req.file)
    console.log(req.file, '???')
 
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})
 




module.exports = router;