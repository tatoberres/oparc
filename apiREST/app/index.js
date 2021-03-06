const express = require('express');
const router = require('./routers');

const app = express();

// app.set('view engine', 'pug');
// app.set('views', './app/views');

require('./helpers/apiDocs')(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

app.use(router);

module.exports = app;
