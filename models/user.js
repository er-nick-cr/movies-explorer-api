const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

userSchema.statics.emailValidation = function validate({ email }) {
  return validator.isEmail(email);
};

module.exports = mongoose.model('user', userSchema);
