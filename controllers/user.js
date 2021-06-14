const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 


//create a new user
router.post('/', (req, res) => {
  let username = req.body.username
  db.user.findOrCreate({
    where: {
      username: req.body.username,
      zipcode: req.body.zipcode
    }
  })
  .then(([newUser, newUserCreated]) => {
      //console.log('NEWUSER IN POST', newUser)
      //console.log(newUser.id, '🔥')
      res.redirect(`/user/${newUser.id}`)
    })
  })

//show the user their items and form to create new item (form will post to POST /item)
router.get('/:userId', (req, res) => {
//req.params userid look up user 
let userData = req.params.userId
//console.log('🌕🌕🌕🌕🌕🌕🌕🌕')
//console.log(userData)
db.item.findAll( {
  where: {
    userId:userData
  }
})
.then(foundItems => {
  db.user
    .findOne({
      where: {
        id: userData
      }
      
  }).then(foundUser => {
    console.log(foundItems)
    res.render('user', { foundItems: foundItems, username: foundUser.username })
  })
})
  //console.log(foundItems)
  //res.send("hit the route")

//render the profile

//res.render("user", { imgSrc: src, newItem:newItem })
  //res.render('user', {userData:userData})
})


module.exports = router 