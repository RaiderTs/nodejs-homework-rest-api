const Joi = require('joi')
const { HttpCode } = require('../../../helpers/constants')

const schemaRegistration = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.number().min(6).required(),
})

const schemaLogin = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.number().min(6).required(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message,
    })
  }
  next()
}

module.exports.registration = (req, _, next) => {
  return validate(schemaRegistration, req.body, next)
}

module.exports.login = (req, _, next) => {
  return validate(schemaLogin, req.body, next)
}

module.exports.uploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Field of avatar with file not found',
    })
  }
  next()
}