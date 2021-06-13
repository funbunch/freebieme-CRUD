const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
const multer = require('multer') 
const upload = multer({ dest: '../uploads/'})
const cloudinary = require('cloudinary')

//create a new user
router.post('/', (req, res) => {
  // let currentUser = req.body.username
  // console.log(req.body.username,'👋🏻')
  console.log(req.body, '🌐🚺')
  // use req.body to find or create new user in db
  db.user.findOrCreate({
    where: {
      username: req.body.username,
      zipcode: req.body.zipcode
    }
  }).then(([user, wasCreated]) => {
    let userData = user
      // res.redirect('/user/:userId')
    // console.log(user.get())
    res.render('user', {userData: userData })
    //res.redirect(`/user/${user.get().id}`)
  })
  .catch(err => {
    console.log(err)
  })
})

//show the user their items and form to create new item (form will post to POST /item)
// router.get('/:userid', (req, res) => {
// //req.params userid look up user 
// let userData = req.params.userid
// //render the profile
//   res.render('user', {userData:userData})
// })

// router.post('/detail', upload.single('itemImg'), (req, res) => {
//   console.log('🎖🇵🇷')
//   // let currentUser = req.body.username
//   // console.log(req.body.username,'👋🏻')
//   // use req.body to find or create new user in db
//   cloudinary.uploader.upload(req.file.path, (result) => {
   
//     //TODO allow for other imgs besides jpg
//     const imageId = `${result.public_id}.jpg`
//     const src = cloudinary.image(imageId, {width: 200, crop: "scale"})
//     //console.log(result.public_id)
//     console.log(imageId, '🥰')
//     // res.send(result)
//     res.render('detail', {imgSrc: src })
//   })
// })

module.exports = router 