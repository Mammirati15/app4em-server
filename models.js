'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {
		type: String, 
		required: [true, 'Name is Required']
	},
	keyWords: String,	
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});
var Category = mongoose.model("Category", CategorySchema);

var UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First Name is Required']
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is Required']
	},
	email: {
		type: String,
		required: [true, 'Email is Required']
	},
	password: {
		type: String,
		required: [true, 'password is Required']
	},
	authToken: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});
var User = mongoose.model("User", UserSchema);

module.exports.Category = Category;
module.exports.User = User