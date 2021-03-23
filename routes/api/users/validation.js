const Joi = require("joi");

const schemaAddUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  password: Joi.number().min(6).required(),
  subscription: Joi.string(),
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  password: Joi.number().min(6).required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: 400,
      message: `missing field: ${message.replace(/"/g, "")}`,
    });
  }

  next();
};

module.exports.reg = (req, _res, next) => {
  return validate(schemaAddUser, req.body, next);
};

module.exports.login = (req, _res, next) => {
  return validate(schemaLogin, req.body, next);
};
