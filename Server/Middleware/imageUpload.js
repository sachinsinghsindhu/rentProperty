const multer = require('multer');
const fs = require('fs');
const path = require('path');


function upload(folder) {
    const storage = multer.diskStorage({
        destination: function(req, file, callback) {
            const path = './Static/Upload/' + folder.toString();
            if(!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            callback(null, path);
        },
        filename: function(req, file, callback) {
            const fileName = file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
            callback(null, fileName);
        }
    });
    const multerOtions = {
        storage: storage,
        fileFilter: function(req, file, callback) {
            const ext = path.extname(file.originalname);
            // console.log(ext);
            if(ext == '.png' || ext == '.jpg' || ext == '.jpeg') {
                callback(null, true);
            } else {
                callback(new Error("only images are allowed"));
            }
        }
    }
    const uploadObj = multer(multerOtions);
    return uploadObj;
}

module.exports = upload;