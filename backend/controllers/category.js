const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({user: req.user.id})
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getByID = async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id)
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Category.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Category delete'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  const category = new Category({
    store: req.body.store,
    price: req.body.price,
    productName: req.body.productName,
    quantityOfGoods: req.body.quantityOfGoods,
    weightOfItem: req.body.weightOfItem,
    productCategory: req.body.productCategory,
    date: req.body.date,
    user: req.user.id,
  })
  try {
    await category.save()
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}