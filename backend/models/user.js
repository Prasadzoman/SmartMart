
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  }
}, { timestamps: true });


UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', 
});

module.exports = mongoose.model('User', UserSchema);
