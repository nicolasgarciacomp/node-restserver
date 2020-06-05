/**
 * @fileoverview	./server/routes/index.js
 *
 * @version         1.0
 *
 * @author          Nicolás Garcia <nicolasgarciacomp@gmail.com>
 *
 * History
 * v1.0 – Se creó el archivo
**/

// Require
const express = require('express');
const app = express();

app.use(require('./pedido.js'));
app.use(require('./orden.js'));

module.exports = app;
