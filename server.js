var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require("mongoose");
var catRoutes = require("./routes/catRoutes")
var userRoutes = require("./routes/userRoutes")
var User = require('./models').User

mongoose.connect("mongodb://localhost:27017/app4em");
var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection successful");
});

var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/cats', catRoutes)
app.use('/users', userRoutes)


app.post('/users/sessions', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) return res.json({ err: err })
    if(!user) return res.json({ err: 'Invalid email or password' })
    if(user.password !== req.body.password)
      return res.json({ err: 'Invalid email or password' })
    var token = '123456'
    user.token = token
    //User.update({token: token}, ())
    res.json({ err: null, data: user })
  })
})



app.listen(process.env.PORT || 3000, () => {
  console.log('server started on port', process.env.PORT)
})