const express = require('express');
const bodyParser = require('body-parser');
const {Category, User} = require('../models');

const categoriesRouter = express.Router();

categoriesRouter.use(bodyParser.json());

categoriesRouter.route('/:id')
.get((req, res, next) => {
  Category.findById(req.params.id, (err, cat) => {
    if(err) return res.json({err})
    res.json({ err: null, data: cat })
  })
})
.put((req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, req.body, (err, cat) => {
    if(err) return res.json({err})
    res.json({ err: null, data: cat })
  })
})
.delete((req, res) => {
  
  Category.findOneAndDelete({_id: req.params.id}, (err, result) => {
    if(err) return res.json({ err: err })
    console.log(result)
    res.json({err: null, data: result})
  })
})

categoriesRouter.route('/')
.get((req, res, next) => {
  Category.find({}, (err, cats) => {
    if(err) return next(err)
    res.json({ err: null, data: cats })
  })
})
.post((req, res, next) => { 
  //reject missing authToken
  if(!req.body.authToken){
    return res.sendStatus(401)
  }  

  User.findOne({authToken: req.body.authToken}, (err, user) => {
    if(err) return res.sendStatus(401)
    if(!user) return res.sendStatus(401)
  
    var cat = new Category({
      name: req.body.name,
      keyWords: req.body.keyWords
    })
    
    cat.save((err, cat) => {
      if(err) return res.json({ err: err })
      return res.json({ err: null, data: cat })
    })
  })
})

.delete((req, res) => {  
  Category.deleteMany({}, (err, result) => {
    if(err) return res.json({ err: err })    
    res.json({err: null, data: null})
  })
})



module.exports = categoriesRouter;

