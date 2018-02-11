const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Offer = require('./offer');

const ongSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    picture: {
      pic_path: { type: String },
      pic_name: { type: String },
    },
    email: { type: String },
    name: { type: String },
    telephone: { type: String },
    interests: { type: [] },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    _offersPublished: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Ong = mongoose.model('Ong', ongSchema);

module.exports = Ong;
