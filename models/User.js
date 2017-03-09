const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  google: String,
  tokens: Array,
  twilio: String,
  admin: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
  login_ip: String,
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number },
  contact: {
    name: String,
    phone: String,
    email: String
  },
  notification: {
    morning: {type: Boolean, default: false },
    evening: {type: Boolean, default: false },
  },
  profile: {
    name: {
      first: String,
      middle: String,
      last: String
    },
    username: String,
    gender: String,
    location: String,
    phone: {
      type: String,
    },
    bio: String,
    website: String,
    picture: String,
    date_of_birth: Date,
    address: {
      street: String,
      city: String,
      zip: { type: Number, match: /\d{5}/ },
      state: { type: String },
      country: { type: String }
    }
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
