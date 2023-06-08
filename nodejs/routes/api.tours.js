const db = require('../connectbtl');
module.exports = function(server){
    server.get('/api/tours', function(req, res){
        db.query("SELECT * FROM tours", function(err, data){
            if(err){
                message = err.sqlMessage;
            } else{
                res.send({
                    result: data
                })
            }
        });
    });

    server.get('/api/toursnew', function(req, res){
        db.query("SELECT p.*,c.name as dm FROM  tours p JOIN category c on p.category_id = c.id ORDER BY id DESC LIMIT 3", function(err, data){
            let message = null;
            if(err){
                message = err.sqlMessage;
            } else{
                res.send({
                    result: data
                })
            }
        });
    
    });

    server.get('/api/tourssale', function(req, res){
        db.query("SELECT p.*,c.name as dm FROM  tours p JOIN category c on p.category_id = c.id Where sale_price > 0 ORDER BY id DESC LIMIT 10", function(err, data){
            let message = null;
            if(err){
                message = err.sqlMessage;
            } else{
                res.send({
                    result: data
                })
            }
        });
    
    });



    server.delete('/api/tours/:id', function(req, res){
        let id = req.params.id;
        let sql = "DELETE FROM tours WHERE id = ?";
        db.query(sql, [id] , function(err, data){
            if(!err){
                res.send({
                    result: data
                })
            }
        });
    });

    server.post('/api/tours', function(req, res){
        let formData = req.body;
        let sql = "INSERT INTO tours SET ?";
        db.query(sql, [formData], function(err, data){
            formData.id = data.insertId;
            if(!err){
                res.send({
                    result: formData
                })
            }
        })
    });


    server.get('/api/tours/:id', function(req, res){
        let id = req.params.id;
        let sql = "SELECT * FROM tours WHERE id = ?"
        db.query(sql, [id], function(err, data){
            
            res.send({
                result: data.length ? data[0]: null,
            })
        })
    });
    


    
    server.put('/api/tours/:id', function(req, res){
        let formData = req.body;
        let id = req.params.id
        let sql = "UPDATE tours SET ? WHERE id = ?";
        db.query(sql, [formData, id], function(err, data){
            formData.id = id
            if(!err){
                res.send({
                    result: formData,
                    message: 'Cập nhật thành công'
                })
            }
        })
    });
    server.get('/api/toursbycategory/:id', function(req, res){
        let id = req.params.id;
        let sql = "SELECT * FROM tours WHERE category_id = ?";
        db.query(sql, [id], function(err, data){
            
            res.send({
                result: data
            })
        })

    })
}