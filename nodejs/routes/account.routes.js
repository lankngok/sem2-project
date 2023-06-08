const db = require('../connectbtl');
module.exports = function(server){
    server.get('/account', function(req, res){
        db.query("SELECT * FROM account", function(err, data){
            let message = null;
            if(err){
                message = err.sqlMessage;
            } else{
                res.render('account/account', {
                    data: data

                });
            }
        });
    });
    
    server.post('/account', function(req, res){
        let formname = req.body.name;
        let SQL = "SELECT * FROM account WHERE name like ?";
        db.query(SQL, [formname], function(err, data){
            if(formname == 0){
                res.redirect('/account');
            } else{
                res.render('account/account', {
                    data: data
                });
            }
        });
    });
    server.get('/create-account', function(req, res){
        res.render('account/create-account');
    });
    
    server.post('/create-account', function(req, res){
        let formData = req.body;
        let sql = "INSERT INTO account SET ?";
        db.query(sql, [formData], function(err, data){
            if (!err) {
                res.redirect('/account');
            } else {
            }
        });
    });
    
    server.get('/update-account/:id', function(req, res){
        let id = req.params.id;
        let SQL = "SELECT * FROM account WHERE id = ?";
        db.query(SQL, [id], function(err, data){
            res.render('account/update_account', {
                cat: data.length ? data[0] : null
            });
        });
    });
    
    server.post('/update-account/:id', function(req, res){
        let formData = req.body;
        let id = req.params.id;
        let sql = "UPDATE account SET ? WHERE id = ?";
        db.query(sql, [formData, id], function(err, data){
            if (!err) {
                res.redirect('/account');
            }
        });
    });

}