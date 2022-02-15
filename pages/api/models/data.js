const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
		type: String,
		required: true
	},
  password: {
		type: String,
		required: true
	},
  todo:[String]
});
UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}
const model = mongoose.model("DataModel", UserSchema);

module.exports = model;
