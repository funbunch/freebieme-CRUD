const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 


//create a new user
router.post('/', (req, res) => {
  let currentUser = req.body.username
  console.log(req.body.username,'👋🏻')
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
     console.log(user.get())
     res.render('user', { username: currentUser })
    //res.render('user', {userData: userData })
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


module.exports = router 