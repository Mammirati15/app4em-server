const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('../models');
const shortid = require('shortid')
const userRouter = express.Router();


userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req, res, next) => {
  User.find({}, (err, users) => {
    if(err) return next(err)
    res.json({ err: null, data: users })
  })
})
.post((req, res, next) => {
  var user = new User(req.body)
  User.findOne({email: req.body.email}, (err, exsistingUser) => {
    if(err) return res.json({ err: err })
    console.log('exsistingUser', exsistingUser)
    if(exsistingUser) return res.json({ err: "Email Address Already Exsists" })

    user.authToken = shortid()
    user.save((err, user) => {
      if(err) return res.json({ err: err })
      res.json({ err: null, data: user })
    })
  })
})
// .post((req, res, next) => {   
//   var cat = new Category({
//     name: req.body.name,
//     keyWords: req.body.keyWords
//   })
//   cat.save((err, cat) => {
//     if(err) return res.json({ err: err })
//     return res.json({ err: null, data: cat })
//   })
// })
.delete((req, res) => {  
  User.deleteMany({}, (err, result) => {
    if(err) return res.json({ err: err })    
    res.json({err: null, data: null})
  })
})

userRouter.route('/:id')
.get((req, res, next) => {
  console.log(req.params.id)
  User.findById(req.params.id, (err, user) => {
    if(err) return res.json({err})
    res.json({ err: null, data: user })
  })
})
.put((req, res, next) => {
  console.log(req.body, req.params.id)
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    if(err) return res.json({err})
    res.json({ err: null, data: user })
  })
})
.delete((req, res) => {  
  User.findOneAndDelete({_id: req.params.id}, (err, result) => {
    if(err) return res.json({ err: err })
    console.log(result)
    res.json({err: null, data: result})
  })
})



module.exports = userRouter;
