//required pack
require('dotenv').config()
const express = require('express')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN })
const layouts = require('express-ejs-layouts')
const multer = require('multer')
const upload = multer({ dest: './uploads/'})
const cloudinary = require('cloudinary')
const { response } = require('express')

// config app
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

//middlewares
app.use(layouts)
app.use(express.static(__dirname + '/public'))

//routes
// GET -- show a form that lets user serach for location
app.get('/', (req, res) => {
  res.render('index')
})

//displays profile page for current user
app.get('profile', (req, res) => {
  let currentUser = req.body,username
  res.render('profile,' {username: currentUser })
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

//displays current user loation from db
app.get('/location', (req, res) => {
  let currentUser = req.query.user

  db.user.findAll({
    where: {
      username: currentUser
    }
  }).then((response) => {
    let zipcode = response[0].dataValues.zipcode
    res.render('location', {zipcode: zipcode})
  })
})

app.post('/', upload.single('itemImg'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    //res.send(result)
    //TODO allow for other imgs besides jpg
    const imageId = `${result.public_id}.jpg`
    const src = cloudinary.image(imageId, {width: 151, crop: "scale"})
    // console.log(result.public_id)
    //console.log(src)
    res.render('banana', {imgSrc: src })
  })
 
})

app.listen(PORT, () => console.log(`You are listening on ${PORT}`))
