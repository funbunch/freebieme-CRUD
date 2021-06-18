require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const multer = require('multer') 
const upload = multer({ dest: '../uploads/'})
const cloudinary = require('cloudinary')

router.post("/:id", upload.single("image"), (req, res) => {
  console.log(req.file, '♍️')
  cloudinary.uploader.upload(req.file.path, (result) => {
    let username = req.body.username;
    //console.log(req.body, '⚠️🔴🟢')
    const imageId = `${result.public_id}.jpg`;
    //console.log(imageId)
    //console.log(result, '☢️💜')
    const src = cloudinary.image(imageId, { width: 200, crop: "scale" });
    //get user
    db.user
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        user
          .createItem({
            product: req.body.product,
            category: req.body.category,
            description: req.body.description,
            image: src,
          })
          
          .then((newItem) => {
            //console.log(newItem)
            console.log('🌕🌕🌕🌕🌕🌕🌕🌕')
            console.log(newItem)
            res.redirect(`/user/${newItem.get().userId}`)
            //res.render("item", { imgSrc: src, newItem:newItem });
          })
          .catch((error) => console.log(error, "🚑🚑🚑 error 🚑🚑🚑"));
      })
  });
});

// router.get('/:id', (req, res) => {
//   let itemData = req.params.id
//   //console.log(itemData, '🔸')
//    res.render('item', { itemData:itemData, imgSrc: src })
//   })

  //DELETE
router.delete('/:id/user/:userid', (req, res) => {
  console.log("===== delete", req.params)
  const itemData = req.params.id
  const userid = req.params.userid
  db.item.destroy({
    where: {
      id: itemData
    }
  })
  .then(response => {
    res.redirect(`/user/${userid}`)
  })
})

//GET -show all items in the db (and use req.query to search/sort them) <- your search form has an action to this route
router.get('/view-all', (req, res) => {
  //console.log(req.query)
    //res.send('Find All')
    db.user.findAll( {
      where: {
        zipcode: req.query.zipcode
      }
    }).then(foundUsers => {
      //console.log(foundUsers.length, "ZIP????")
      if (foundUsers.length > 0) {
        Array.from(foundUsers).forEach(user => {
          db.item
            .findAll({
              where: {
                userId:user.id
              }
            }).then(usersItems => {
              //console.log(usersItems.length, "USERSITEMS")
              res.render('view-all', {usersItems:usersItems})
            })
          })
  
      } else {
        //ejs if/else fail so using this render
        res.render('view-none')
      }
    })

    })

// // making an item
// router.post("/detail", (req, res) => {
//   // the name of the item
//   console.log(req.body, '✅✅')
//   let username = req.body.username;
//   console.log('post route hit', username)
//   //get user
//   db.user
//     .findOne({
//       where: {
//         username: username,
//       },
//     })
//     .then((user) => {
//       console.log(user, 'USER')
//       // handle Cloudinary uploads
//       cloudinary.uploader.upload(req.file.path, (result) => {
//         console.log(result, "RESULT")
//         const imageId = `${result.public_id}.jpg`;
//         const src = cloudinary.image(imageId, { width: 200, crop: "scale" });
//         user
//           .createItem({
//             product: req.body.item,
//             category: req.body.category,
//             image: src,
//           })
//           .then(() => {
//             console.log('post route completed', '🐭')
//             res.render("detail", { imgSrc: src });
//           })
//           .catch((error) => console.log(error, "🚑🚑🚑 error 🚑🚑🚑"));
//       });
//     })
//     .catch((error) => console.log(error, "🚑🚑🚑 error 🚑🚑🚑"));
// });

// //create a new item 
// router.post('/detail', upload.single('itemImg'), (req, res) => {
//   console.log('🎖🇵🇷')
//   let username = req.body.username;
//   db.user 
//   .findOne({
//     where: {
//       username: username,
//     },
//   })
//   .then((user) => {
//     user
//       .createItem({
//         product: req.body.item,
//         category: req.body.category,
//         image:req.body.image
//       })
//       .then(() => {
//         res.redirect(`/detail`);
//       })
//       .catch((error) => console.log(error, "🚑🚑🚑 error 🚑🚑🚑"));
//     })
//     .catch((error) => console.log(error, "🚑🚑🚑 error 🚑🚑🚑"));

//   })


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

// item or user?
// router.put('/:userid', (req, res) => {

//   //find one from req.params.id and us the req body to update
//   itemData[req.params.id].userid = req.body.userid
//   itemData[req.params.id].product = req.body.product
//   itemData[req.params.id].category = req.body.category
//   itemData[req.params.id].img = req.body.img

//   //redirect 
//   res.redirect('/:userid')  
  
//   })




module.exports = router 