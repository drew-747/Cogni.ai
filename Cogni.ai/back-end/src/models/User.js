const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  learningStyle: { type: String },
  preferences: {
    textColor: { type: String, default: '#000000' },
    backgroundColor: { type: String, default: '#FFFFFF' },
    fontSize: { type: Number, default: 16 }
  },
  progress: { type: Map, of: Number },
  points: { type: Number, default: 0 },
  level: { type: String, default: 'Novice' },
  isAdmin: { type: Boolean, default: false }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);