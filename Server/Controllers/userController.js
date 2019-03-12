const query = require('../Models/userQuery');
const bcrypt = require('bcrypt');
const config = require('../config');

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

module.exports = {
    loginController: loginController,
    signUpController: signUpController,
}