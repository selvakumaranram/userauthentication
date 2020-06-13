const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  Name:{ type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile:{ type: String },
  DateofBirth:{type: String, required: true},
  password: { type: String, required: true }


});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
