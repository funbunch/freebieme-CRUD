//required pack
require('dotenv').config()
const express = require('express')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN })
const layouts = require('express-ejs-layouts')

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
  res.render('index.ejs')
})

app.listen(PORT, () => console.log(`You are listening on ${PORT}`))
