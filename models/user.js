const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Offer = require('./offer');

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    picture: {
      pic_path: { type: String },
      pic_name: { type: String },
    },
    birthdate: { type: Date },
    name: { type: String },
    surname: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    telephone: { type: String },
    interests: { type: [] },
    availability: { type: [] },
    _offersRegistered: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    usePushEach: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
