const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const isUrl = (link) => {
  validator.isURL(link, { require_protocol: true });
  return link;
};

const movieFieldsValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrl, 'check URL'),
    trailer: Joi.string().required().custom(isUrl, 'check URL'),
    thumbnail: Joi.string().required().custom(isUrl, 'check URL'),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const userFieldsValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email({ tlds: { allow: false } }),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const userCredentialsValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  }),
});

const userDataInputValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  movieFieldsValidation,
  userFieldsValidation,
  movieIdValidation,
  userCredentialsValidation,
  userDataInputValidation,
};
