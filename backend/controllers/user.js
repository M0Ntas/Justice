const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getByID = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

