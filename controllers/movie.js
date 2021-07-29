const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const Movie = require('../models/movie');

const find = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const create = (req, res, next) => {
  const owner = req.user.id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    owner,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(
          'Переданы некорректные данные при создании фильма.',
        );
      }
      next(err);
    })
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  find,
  create,
  deleteMovie,
};
