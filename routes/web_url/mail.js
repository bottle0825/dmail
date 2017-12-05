var express = require('express');
var router = express.Router();
var Mail = require('../../operation/mail');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('mail/list', {
		title: '邮件列表'
	});
});
router.get('/send', function(req, res, next) {
	if(req.param)
		res.render('mail/send', {
			title: '发送邮件'
		});
});
router.get('/:id', function(req, res, next) {
	if(!isNaN(req.params.id)){
		res.render('mail/content', {
			title: '邮件信息'
		});
	}
});

module.exports = router;