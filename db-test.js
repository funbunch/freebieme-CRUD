const db = require('./models');

db.user.create({
    //use name from model
    username: 'testUser',
    zipcode: 90049

  }).then(user => {
    //.dot to name to model
    console.log('Created: ', user.username)
  })

  //create a freebie post
  db.item.create({
    // where: {
    //   username: req
    //   //local storage info

    // }
  })

  //TODO

