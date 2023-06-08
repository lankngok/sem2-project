const db = require('../connectbtl');

const upload = require('./moddleware/upload');


module.exports = function(server){
    server.get('/tours', function(req, res){
        db.query("SELECT tours.id, tours.name as namet, tours.price, tours.sale_price, tours.image, category.name as namec, tours.status, tours.description , tours.image1 , tours.image2 , tours.image3 , tours.image4 , tours.image5 , tours.des2 , tours.des3 FROM tours JOIN category ON tours.category_id = category.id", 
        function(err, data){
            let message = null;
            if(err){
                message = err.sqlMessage;
            } else{
                res.render('tour/tours', {
                    data: data
                });
            }
        });
    });
    server.post('/tours', function(req, res){
        let formname = req.body.name;
        let SQL2 = "SELECT tours.id, tours.name as namet, tours.price, tours.sale_price, tours.image, category.name as namec, tours.status, tours.description , tours.image1 , tours.image2 , tours.image3 , tours.image4 , tours.image5 , tours.des2 , tours.des3 FROM tours JOIN category ON tours.category_id = category.id WHERE tours.name like ?";
        db.query(SQL2, [`%` + formname + `%`], function(err, data){
            if(formname == 0){
                res.redirect('/tours');
            } else {
                res.render('tour/tours', {
                    data: data
                });
            }
        });
    })

    server.get('/delete-tours/:id', function(req, res){
        let id = req.params.id;
        let sql = "DELETE FROM tours WHERE id = ?";
        db.query(sql, [id] , function(err, data){
            if(!err){
                res.redirect('/tours');
            }
        });
    });




    server.get('/create-tours', function(req, res){
        db.query("SELECT * FROM category", function(err, data){
            res.render('tour/create-tours', {
                data: data
                
            });
            
        });
    });

    server.post('/create-tours', upload, function(req, res){
        let formData = req.body;
        if(req.file){
            formData.image = req.file.filename;
        }
        let sql = "INSERT INTO tours SET ?";
        db.query(sql,  [formData], function(err, data){
            if(!err){
                res.redirect('/tours');
            }
        })
    });


    server.get('/update-tours/:id', function(req, res){
        let id = req.params.id;
        let sql = "SELECT * FROM tours WHERE id = ?"
        db.query(sql, [id], function(err, data){
            res.render('tour/update-tours', {
                cat: data.length ? data[0]: null
            });
        })
    })
    server.post('/update-tours/:id', upload, function(req, res){
        let formData = req.body;
        let id = req.params.id;
        if(req.file){
            formData.image = req.file.filename;
        }
        let sql = "UPDATE tours SET ? WHERE id = ?";
        db.query(sql, [formData, id], function(err, data){
            if(!err){
                res.redirect('/tours');
            }
        })
    })
}