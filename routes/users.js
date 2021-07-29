const router = require('express').Router();
const { userFieldsValidation } = require('../utils/celebrateValidation');

const { findCurrentUser, update } = require('../controllers/user');

router.get('/me', findCurrentUser);

router.patch('/me', userFieldsValidation, update);

module.exports = router;
