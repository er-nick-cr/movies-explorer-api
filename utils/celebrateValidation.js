const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const isUrl = (link) => {
  validator.isURL(link, { require_protocol: true });
  return link;
};

const cardFieldsValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(isUrl, 'check URL'),
  }),
});

const userFieldsValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrl, 'check URL'),
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
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isUrl, 'check URL'),
  }),
});

module.exports = {
  idValidation,
  cardFieldsValidation,
  userFieldsValidation,
  avatarValidation,
  cardIdValidation,
  userCredentialsValidation,
  userDataInputValidation,
};
