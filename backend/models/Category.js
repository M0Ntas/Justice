const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  store: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantityOfGoods: {
    type: Number,
    required: true
  },
  weightOfItem: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('categories', categorySchema)