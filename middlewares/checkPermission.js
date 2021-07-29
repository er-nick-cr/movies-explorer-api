const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const checkPermission = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }

      if (`${movie.owner}` !== `${req.user.id}`) {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }
      next();
    })
    .catch((err) => next(err));
};

module.exports = { checkPermission };
