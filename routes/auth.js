const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { isEmailAvailable } = require('../helpers/db-validators');

const router = Router();

router.post('/login', [
    check('email', 'Email field is required').isEmail(),
    check('password', 'Password field is required').not().isEmpty(),
    validateFields
], login);

router.post('/register', [
    check('email', 'Email field is required').isEmail(),
    check('email').custom(isEmailAvailable),
    check('password', 'Password field is required').not().isEmpty(),
    validateFields
], register);


module.exports = router;