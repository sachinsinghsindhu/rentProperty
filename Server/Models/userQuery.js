const mysql = require('mysql');
const connectionParam = require('../config').connect;

const pool = mysql.createPool(connectionParam);

function findUser(userName) {
    const qry = `select * from users where userName = '${userName}'`;
    // console.log('findUser');
    return new Promise (function(resolve) {
        pool.query(qry, (err, result) => {
            if(err) {
                throw err;
            } else {
                resolve(result);
            }
        });
    });
}

function createUser(userName, password) {
    const qry = `insert into users (userName, password) values ('${userName}', '${password}')`;
    // console.log('createUser');
    return new Promise (function (resolve) {
        pool.query(qry, (err, result) => {
            if(err) {
                throw err;
            } else {
                resolve(result);
            }
        });
    });
}

function addProperty(userName, property) {
    const qry = `insert into property (userName, propertyPics) values ('${userName}', '${JSON.stringify(property.propertyPics)}')`;
    return new Promise(function(resolve) {
        pool.query(qry, (err, result) => {
            if(err) throw err;
            else resolve(result);
        });
    });
}

function addProfilePic(userName, profilePic) {
    const qry = `update users set profilePic = '${profilePic}' where userName = '${userName}'`;
    return new Promise(function(resolve) {
        pool.query(qry, (err, result) => {
            if(err) throw err;
            else resolve(result);
        });
    });
}
module.exports = {
    findUser: findUser,
    createUser: createUser,
    addProperty: addProperty,
    addProfilePic: addProfilePic,
}