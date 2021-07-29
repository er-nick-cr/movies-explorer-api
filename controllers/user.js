const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { BadRequestError } = require('../errors/BadRequestError');

const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NotFoundError } = require('../errors/NotFoundError');

const {
  ConflictingRequestError,
} = require('../errors/ConflictingRequestError');

const generateAccessToken = (id) => {
  const payload = { id };

  return jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    {
      expiresIn: '24h',
    },
  );
};

const findCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const isValid = await User.emailValidation({ email });

    const candidate = await User.findOne({ email });

    if (candidate) {
      throw new ConflictingRequestError(
        'Пользователь c таким email уже существует',
      );
    }

    if (!isValid) {
      throw new BadRequestError(
        'Переданы некорректные данные при создании пользователя.',
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 12, process.env.NODE_ENV);

    User.create({
      name,
      email,
      password: hashedPassword,
    })
      .then((user) => {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          );
        }
        next(err);
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
}

const update = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user.id;
  User.findByIdAndUpdate(
    owner,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send({
        user,
      });
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильный email или пароль');
      }
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateAccessToken(user._id);
        if (!token) {
          throw new UnauthorizedError('Неправильный email или пароль');
        }
        return res
          .cookie('JWT', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
          })
          .send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
            email: user.email,
          });
      }
      throw new UnauthorizedError('Неправильный email или пароль');
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  findCurrentUser,
  update,
  login,
};
