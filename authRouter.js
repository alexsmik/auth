const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');

router.post('/registration',[
    check('username', "empty").notEmpty(),
    check('password', "more than 6").isLength({min:6,max:10})
],controller.registration);

router.post('/login', controller.login);
router.get('/users', controller.getUser);

module.exports = router;
