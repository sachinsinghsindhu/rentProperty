const mysql = require('mysql');
const connectionParam = require('../config').connect;

const pool = mysql.createPool(connectionParam);

function findUser(userId,req,res,next) {
    const qry = `select * from users where userId = ${userId}`;
    pool.query(qry, (err, results) => {
        if(err) {
            res.sendStatus(500);
            return;
        }
        // console.log(JSON.parse(results[0].property));
        req.queryRes = results;
        // res.send(results);
        next();
    });
}

module.exports = {
    findUser: findUser,
}