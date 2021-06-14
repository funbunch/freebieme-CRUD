const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 


//create a new user
router.post('/', async (req, res) => {
  const newUser = await db.user.findOrCreate({
    where: {
      username: req.body.username,
      zipcode: req.body.zipcode
    }
  })
  //console.log('NEWUSER IN POST', newUser)
  res.render('user', { username: req.body.username })
})

//show the user their items and form to create new item (form will post to POST /item)
router.get('/:userid', (req, res) => {
//req.params userid look up user 
let userData = req.params.userid
//render the profile
res.render(`/user/${user.get().id}`)
  //res.render('user', {userData:userData})
})


module.exports = router 