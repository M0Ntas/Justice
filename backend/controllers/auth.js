const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const Category = require("../models/Category");

module.exports.login = async (req, res) => {

  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    //пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // мы должны сгенерировать токен, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, keys.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        //Пароли не совпали
        message: 'Password mismatch. Try again.',
        label: 'password'
      })
    }
  } else {
    //пользователя нет
    res.status(404).json({
      message: 'User with this email was not found.',
      label: 'mail'
    })
  }
}

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    //пользователь существует, нужно дать ошибку
    res.status(409).json({
      message: 'This email is already taken. Try another.'
    })
  } else {
    //создать пользователя
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      companyName: req.body.companyName,
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      // Обработать ошибку
      errorHandler(res, e)
    }
  }
}

module.exports.update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {email: req.params.email},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}