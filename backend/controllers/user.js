const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const bcrypt = require("bcryptjs");

module.exports.getByID = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  const objUpdate = {
    ...req.body
  }
  try {
    const candidate = await User.findOne({_id: req.body._id})
    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.oldPassword, candidate.password)
      if (passwordResult) {
        const salt = bcrypt.genSaltSync(10)
        objUpdate.password = bcrypt.hashSync(objUpdate.newPassword, salt)
      } else {
        res.status(401).json({
          //Пароли не совпали
          message: 'Password mismatch. Try again.',
        })
      }
    }
    const user = await User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: objUpdate},
      {new: true}
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

