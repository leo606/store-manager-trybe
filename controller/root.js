const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/product', require('./product/router'));

module.exports = root;