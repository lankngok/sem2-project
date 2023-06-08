const db = require('../connectbtl');
const sestion = require('node-sessionstorage');
module.exports = function(server){


    server.get('/register', function(req, res){
        res.render('register', {message: null});
    });

    server.post('/register', function(req, res){
        let formData = req.body;
        formData.role = 'admin';
        let sql = "INSERT INTO account SET ?";
        db.query(sql, [formData], function(err, data){
            if(!err){
                res.render('register', {
                    message: 'Đăng ký thành công'
                });
            } else{
                res.render('register', {
                    message: 'Thông tin không chính xác'
                })
            }
        });
    });



    server.get('/login', function (req, res) {
        res.render('login', {
            message: null
        })
    })

          
    server.post('/login', function (req, res) {
        let Sql = "SELECT * FROM account WHERE email = ? AND password = ?";
        db.query(Sql, [req.body.email, req.body.password], function (err, data) {
            if (!err && data.length > 0) {
                if(data[0].role != 'admin'){
                    res.render('login', {
                        message: 'Bạn khong có quyền truy cập trang này'
                    });
                } else {
                    sestion.setItem('admin_login', data[0].name);
                    res.redirect('/home');
                }
            } else {
                res.render('login', {
                    message: 'Thông tin tài khoản không chính xác'
                });
            }
        });
    });
    
}