var express = require('express');
var router = express.Router();
var User = require('../../operation/user');

/* GET users listing. */
router.get('/login', function(req, res, next) {
	res.render('user/login', {
		title: '登录'
	});
});

router.get('/register', function(req, res, next) {
	res.render('user/register', {
		title: '注册'
	});
});

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	res.redirect('/');
});
module.exports = router;