const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async (req, res) => {
  try {
    const position = await Position.find({user: req.user.id})
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const position = await new Position({
      store: req.body.store,
      price: req.body.price,
      productName: req.body.productName,
      quantityOfGoods: req.body.quantityOfGoods,
      weightOfItem: req.body.weightOfItem,
      productCategory: req.body.productCategory,
      numberOfProducts: req.body.numberOfProducts,
      salesDate: req.body.salesDate,
      date: req.body.date,
      user: req.user.id,
    }).save()
    res.status(201).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}