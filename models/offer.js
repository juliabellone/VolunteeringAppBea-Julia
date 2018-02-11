const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ong = require('./ong');
const User = require('./user');

const offerSchema = new Schema(
  {
    _ong: { type: Schema.Types.ObjectId, ref: 'Ong' },
    picture: {
      pic_path: { type: String },
      pic_name: { type: String },
    },
    title: { type: String },
    description: { type: String },
    category: { type: String },
    skillsRequired: { type: [] },
    _usersRegistered: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;

