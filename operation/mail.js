const db = require('../db/basic');
const async = require('async');

function Mail(req,res,next){
    this.user = req.session.user;
    this.req = req;
    this.res = res;
    console.log('mail初始化');
}

Mail.prototype.sendMail = function(){
    var self = this;
    let data = this.req.body;
    db(function(con){
        let mailid = 0;
        var sql = 'SELECT id FROM mailbox WHERE address = \'' + data.address + '\';';
        con.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length !== 0){
                console.log('查询到地址');
                mailboxid = result[0].id;
                console.log(self.user);
                sql = 'INSERT INTO mail (sender, receiver, title, content, date) VALUES(\'' + self.user + '\',\'' + data.address + '\',\'' + data.title + '\',\'' + data.content + '\',\'' + data.date + '\');';
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log('插入邮件表成功');
                    sql = 'SELECT id FROM mail WHERE title = \'' + data.title + '\'AND date = \'' + data.date + '\';';
                    con.query(sql, function (err, result) {
                        if(err) throw err;
                        console.log('查询到邮件id');
                        mailid = result[0].id;
                        sql = 'INSERT INTO receivered_mail (mail, mailbox) VALUES(\'' + mailid + '\',\'' + mailboxid + '\');';
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log('插入收件表成功');
                            self.res.send('success');
                        });
                    });
                });
            }else{
                console.log('发送失败');
                self.res.send('该地址不存在');
            }
        });
    },'dmail');
};
Mail.prototype.readMailList = function(){
    var arr = [];
    var self = this;
    db(function(con){
        var sql = 'SELECT id FROM user WHERE username = \'' + self.user + '\';';
        con.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length !== 0){
                console.log(result[0]);
                var sql = 'SELECT mailbox FROM user_mailbox WHERE user = \'' + result[0].id + '\';';
                con.query(sql, function (err, result) {
                    console.log(result[0]);
                    if (err) throw err;
                    var sql = 'SELECT mail FROM receivered_mail WHERE mailbox = \'' + result[0].mailbox + '\';';
                    con.query(sql, function (err, result) {
                        if(err) throw err;
                        console.log(result.length);
                        async.each(result,function(mailmsg,callback){
                            console.log(mailmsg);
                            var sql = 'SELECT * FROM mail WHERE id = \'' + mailmsg.mail + '\';';
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log(result[0]);
                                arr.push(result[0]);
                                callback();
                            });
                        },function(err){
                            console.log('++++++++++++++++')
                            if(err){
                                console.log('读取失败');
                            }else{
                                console.log('邮件全部读取成功');
                                self.res.send(arr);
                            }
                        });
                    });
                });
            }else{
                console.log('发送失败');
                self.res.send('该地址不存在');
            }
        });
    },'dmail');
};
Mail.prototype.readMailContent = function(){
    var self = this;
    let data = this.req.body;
    db(function(con){
        var sql = 'update mail set state=1 where id=\'' + data.id + '\';';
        con.query(sql, function (err, result) {
            console.log(result);
            self.res.send('文件已读');
        });
    },'dmail');
};
module.exports = Mail;