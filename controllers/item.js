const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const multer = require('multer') 
const upload = multer({ dest: '../uploads/'})
const cloudinary = require('cloudinary')


//create a new item 
router.post('/', upload.single('itemImg'), (req, res) => {
  console.log('🎖🇵🇷')
  // let currentUser = req.body.username
  // console.log(req.body.username,'👋🏻')
  // use req.body to find or create new user in db
  cloudinary.uploader.upload(req.file.path, (result) => {
   
    //TODO allow for other imgs besides jpg
    const imageId = `${result.public_id}.jpg`
    const src = cloudinary.image(imageId, {width: 200, crop: "scale"})
    // console.log(result.public_id)
    // console.log(src, '🥰')
    // res.send(result)
    res.render(`user/${user.get().id}`, {imgSrc: src })
  })

  // db.item.create({
  //   where: {
  //     product: req.body.product,
  //     category: req.body.category,
  //     image:req.body.image 
  //   }
  // }).then(([item, wasCreated]) => {
  //   console.log(item.get())
  //   //res.redirect(`/user/${user.get().id}`)
  // })
  // .catch(err => {
  //   log(err)
  // })
})

//GET -show all items in the db (and use req.query to search/sort them) <- your search form has an action to this route
router.get('/', (req, res) => {
  db.item.findAll({

  }).then(items => {

  })
  .catch(err => {
    log(err)
  })
})

//PUT /item/:itemId -- update one item with id of :itemId -- redirect to /user/:userId (show user the item they edited)

//?? item or user
router.put('/:userid', (req, res) => {

  //find one from req.params.id and us the req body to update
  itemData[req.params.id].userid = req.body.userid
  itemData[req.params.id].product = req.body.product
  itemData[req.params.id].category = req.body.category
  itemData[req.params.id].img = req.body.img

  //redirect 
  res.redirect('/:userid')  
  
  })




module.exports = router 