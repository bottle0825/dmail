var express = require('express');
var router = express.Router();
var User = require('../operation/user');

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: '登录'
    });
});

router.post('/login', function(req, res, next) {
    User(req, res, next);
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        title: '注册'
    });
});
router.post('/register', function(req, res, next) {
    User(req, res, next);
});

module.exports = router;