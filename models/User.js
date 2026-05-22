const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);