const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config');
const userRoutes = require('./Routes/userRoutes');
const port = process.env.PORT || config.Port;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/',express.static('./Static'));

app.use(userRoutes);

app.listen(port, () => {
    console.log(`server running at ${port}`);
});