var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
  name: { type: String, min: 2, max: 30, required: true },
  password: { type: String, min: 8, max: 15, required: true },
  email: { type: String, required: true, unique: true },
  disabled: { type: Boolean, required: true, default: false },
  last_active: { type: Date },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User_admin-panel", user);
