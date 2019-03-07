const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const port = process.env.PORT || config.Port;
const userQuery = require('./Queries/userQuery');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.get('/',(req, res, next) => {
    userQuery.findUser(1,req,res,next);
},(req, res) => {
    console.log('next',req.queryRes);
    res.send(req.queryRes);
});
app.listen(port, () => {
    console.log(`server running at ${port}`);
});