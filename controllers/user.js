const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 

//create a new user post 
router.post('/', (req, res) => {
  // let currentUser = req.body.username
  // console.log(req.body.username,'👋🏻')
  // use req.body to find or create new user in db

  // redirect to /user/:userid

  res.send('👋🏻', 'here')
  // res.redirect('/user/:userId')
})


//show the user their items and form to create new item (form will post to POST /item)
router.get('/:userid', (req, res) => {
//req.params userid look up user 

//render the profile
  res.send()
})

module.exports = router 