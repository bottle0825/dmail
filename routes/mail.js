var express = require('express');
var router = express.Router();
var Mail = require('../operation/mail')

/* GET users listing. */
router.get('/maillist', function(req, res, next) {
    res.render('maillist', {
        title: '邮件列表'
    });
});
router.post('/maillist', function(req, res, next) {
    var mail = new Mail(req,res,next);
    mail.readMailList();
});
router.get('/mailsend', function(req, res, next) {
    res.render('mailsend', {
        title: '发送邮件'
    });
});
router.post('/mailsend', function(req, res, next) {
    var mail = new Mail(req,res,next);
    mail.sendMail();
});
router.get('/mailcon', function(req, res, next) {
    res.render('mailcon', {
        title: '邮件信息'
    });
});
router.post('/mailcon', function(req, res, next) {
    var mail = new Mail(req,res,next);
    mail.readMailContent();
});

module.exports = router;