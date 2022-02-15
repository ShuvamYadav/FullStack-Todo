const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
		type: String,
		required: true
	},
//   email: {
// 		type: String,
// 		required: true
// 	},
  password: {
		type: String,
		required: true
	},
  todo:[String]
});

const model = mongoose.model("DataModel", UserSchema);

module.exports = model;
