const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const mainRoute = require('./route/mainroute')
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/', mainRoute)

app.listen(5000);