const db = require('../connectbtl');
module.exports = function (server) {

    server.post('/api/favourite', function (req, res) {
        let formData = req.body; // account_id, product_id
        // kiểm tra và xóa đã thích trước đó
        let Sql = "SELECT * FROM favourite WHERE account_id = ? AND tours_id = ?";
        db.query(Sql, [formData.account_id, formData.tours_id], function (err, data) {
            formData.id = data.insertId;
            if (data.length > 0) {
                let SqlD = "DELETE FROM favourite WHERE account_id = ? AND tours_id = ?";
                db.query(SqlD, [formData.account_id, formData.tours_id], function (err, data) {
                    formData.id = data.insertId;
                    res.send({
                        result: 'Bỏ yêu thích thành công'
                    })
                });
            } else {
                let SqlI = "INSERT INTO favourite SET ?";
                db.query(SqlI, [formData], function (err, data) {
                    formData.id = data.insertId;
                    res.send({
                        result: 'Thêm yêu thích thành công'
                    })
                });
            }
        });

    })

    
    server.delete('/api/favourite/:acc_id/:t_id', function (req, res) {
        let SqlD = "DELETE FROM favourite WHERE account_id = ? AND tours_id = ?";
        db.query(SqlD, [req.params.acc_id, req.params.t_id], function (err, data) {
            res.send({
                result: 'Đã bỏ yêu thích'
            })
        });
    })

    server.get('/api/favourite/:account_id', function (req, res) {
        let ac_id = req.params.account_id;
        let Sql = "SELECT f.*, t.* FROM favourite f JOIN tours t ON f.tours_id = t.id WHERE f.account_id = ?";
        db.query(Sql, [ac_id], function (err, data) {
            res.send({
                result: data
            })
        });
    });

    server.get('/api/favourite/:acc_id/:t_id', function (req, res) {
        let SqlC = "SELECT * FROM favourite WHERE account_id = ? AND tours_id = ?";
        db.query(SqlC, [req.params.acc_id, req.params.t_id], function (err, data) {
            res.send({
                status: data.length > 0 ? true : false
            })
        });
    })
}