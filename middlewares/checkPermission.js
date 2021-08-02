const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { errorMovie } = require('../errors/errorMessages');

const checkPermission = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMovie.notFound);
      }

      if (`${movie.owner}` !== `${req.user.id}`) {
        throw new ForbiddenError(errorMovie.forbidden);
      }
      next();
    })
    .catch((err) => next(err));
};

module.exports = { checkPermission };
