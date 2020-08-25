'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox")

var db = mongoose.connection;

db.on("error", function(err){
  console.error("connection error", err)
});

db.once("open", function(){
  console.log("connection successful")
  //All database Communication
  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: String,
    color: String,
    size: String,
    mass: Number,
    name: String
  });

  var Animal = mongoose.model("Animal", AmimalSchema)

  var elephant = new Animal({
    type: "elephant",
    color: "grey",
    size: "Big",
    mass: 6000,
    name: "Lawrence"
  })

  db.close()
})
