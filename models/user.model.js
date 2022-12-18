const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, default:'Please Update your address'},
  image: { type: String, required: true, default:"https://xsgames.co/randomusers/assets/images/favicon.png"}
})

const User = mongoose.model('User', userSchema);

module.exports = User;

