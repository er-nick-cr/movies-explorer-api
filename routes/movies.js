const router = require('express').Router();
const { checkPermission } = require('../middlewares/checkPermission');
const {
  movieIdValidation,
  movieFieldsValidation,
} = require('../utils/celebrateValidation');

const { find, create, deleteMovie } = require('../controllers/movie');

router.get('/', find);

router.post('/', movieFieldsValidation, create);

router.delete('/:movieId', movieIdValidation, checkPermission, deleteMovie);

module.exports = router;
