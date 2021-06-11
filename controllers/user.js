const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 

//create a new user post 
router.post('/user/:userId', (req, res) => {
  // let currentUser = req.body.username
  // console.log(req.body.username,'👋🏻')
  res.send('👋🏻', 'here')
  // res.redirect('/user/:userId')
})


//show the user their items and form to create new item (form will post to POST /item)
router.get('/user/:userId', (req, res) => {

  res.send()
})