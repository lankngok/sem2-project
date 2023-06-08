const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/img/')
    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});

// module.exports = 

const upload = multer({
    storage,
    limits: { fileSize: 1 * 1999 * 2000 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).single('image');

module.exports = upload;