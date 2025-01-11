const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const mainRoute = require('./route/mainroute')

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/', mainRoute)

app.listen(3000);