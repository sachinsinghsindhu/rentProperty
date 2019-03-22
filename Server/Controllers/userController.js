const query = require('../Models/userQuery');
const bcrypt = require('bcrypt');
const config = require('../config');
const multer = require('multer');
const multerConstructer = require('../Middleware/imageUpload');

function signUpController(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(userName, password);
    // console.log('signup');
    query.findUser(userName, password)
    .then((user) => {
        console.log(user);
        if(user.length > 0) {
            res.send("username is already in use");
            return;
        }
        return bcrypt.hash(password, config.saltRounds);
    }).then((hash) => {
        if(hash) return query.createUser(userName, hash);
    }).then((user) => {
        if(user) {
            res.send(user);
        }
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

function loginController(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    query.findUser(userName)
    .then((user) => {
        if(user.length > 0) {
            // console.log(user[0].password);
            return bcrypt.compare(password, user[0].password);
        }
    })
    .then((result) => {
        if(result) res.sendStatus(200);
        else res.send("username or password is incorrect");
    }).catch((err) => {
        if(err) console.log(err);
        res.sendStatus(500);
    });
}

function addProperty(req, res) {
    const upload = multerConstructer('property');
    upload.array('property',10)(req, res, (err) => {
        if(err) {
            if(err instanceof multer.MulterError) res.send("too many files");
            else res.send("only images are allowed");
        }
        else {
            let filePathArr = [];
            for(let i = 0; i < req.files.length; i++) {
                // console.log(req.files[i].destination);
                filePathArr.push('http://localhost:3000/Upload/property/' + req.files[i].filename);
            }
            query.addProperty('sachin', {propertyPics: filePathArr})
            .then((results) => {
                // console.log(results);
                res.send(`added property successfully`);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
        }
    });
}

function addProfilePic(req, res) {
    const userName = req.body.userName || 'sachin';
    const upload = multerConstructer('profile').single('profilePic');
    upload(req, res, (err) => {
        if(err) return res.send("only images are allowed");

        const filePath = 'http://localhost:300/Upload/profile' + req.file.filename;

        query.addProfilePic(userName, filePath)
        .then((result) => {
            if(result.affectedRows > 0) {
                res.send('updated profile pic successfully');
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })

    });
}

module.exports = {
    loginController: loginController,
    signUpController: signUpController,
    addProperty: addProperty,
    addProfilePic: addProfilePic,
}