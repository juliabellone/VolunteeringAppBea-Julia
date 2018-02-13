const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Offer = require('./offer');

const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    picture: {
      pic_path: { type: String },
      pic_name: { type: String },
    },
    birthdate: { type: Date },
    email: { type: String },
    name: {
      first: { type: String },
      last: { type: String },
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    zip: { type: String },
    telephone: { type: String },
    interests: { type: [] },
    availability: {
      fulltime: { type: Boolean },
      weekend: { type: Boolean },
      summer: { type: Boolean },
      travel: { type: Boolean },
    },
    _offersRegistered: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
