//required pack
require('dotenv').config()
const express = require('express')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN })
const layouts = require('express-ejs-layouts')
const multer = require('multer')
const methodOverride = require('method-override')
const upload = multer({ dest: './uploads/'})
const cloudinary = require('cloudinary')
const { response } = require('express')
//rowdy logger for loggin routes
const rowdy = require('rowdy-logger')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

//middlewares
app.use(layouts)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded(true))
app.use(methodOverride('_method'))
app.use('/user', require('./controllers/user.js'))

//routes
// GET -- show form to create user
app.get('/', (req, res) => {
  res.render('index')
  //res.json({ msg: 'hello people'})
})

// //POST /user -- create a new user post -- redirect to /user/:userId
// app.post('/user', (req, res) => {

//   console.log(req.body)
//   res.redirect('/user')
//   //redirect to /user/:userId
// })

//GET /user/:userId -- show the user their items and form to create new item (form will post to POST /item)
// app.get('/user/:userid', (req, res) => {
//   res.json({msg: 'Show user items'})
// })


//displays profile page for current user
app.post('/banana', (req, res) => {
  let currentUser = req.body.username
  console.log(req.body.username,'👋🏻')
  res.render('banana', {username: currentUser })
})

app.get('/banana', (req, res) => {
  console.log('🐝')
  res.render('banana')
})

// //displays current user loation from db
// app.get('/location', (req, res) => {
//   let currentUser = req.query.user

//   db.user.findAll({
//     where: {
//       username: currentUser
//     }
//   }).then((response) => {
//     let zipcode = response[0].dataValues.zipcode
//     res.render('location', {zipcode: zipcode})
//   })
// })

//displays image uploaded via form
app.post('/', upload.single('itemImg'), (req, res) => {
  console.log('🎖🇵🇷')
  cloudinary.uploader.upload(req.file.path, (result) => {
    //res.send(result)
    //TODO allow for other imgs besides jpg
    const imageId = `${result.public_id}.jpg`
    const src = cloudinary.image(imageId, {width: 151, crop: "scale"})
    // console.log(result.public_id)
    console.log(imgSrc, '🥰')
    res.render('banana', {imgSrc: src })
  })
 
})
app.get('/logout', (req, res) => {
  res.render('index', {logout: true})
})

// Display all items with filter
app.get('/view-all', (req,res) => {
  let all = "VIEW ALL ITEMS by CAT or ZIP"
  res.send(all)
})

app.get('/detail', (req, res) => {
  let detail = "SHOW DETAIL"
  res.send(detail)
})

app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`You are listening on ${PORT}`)
})
