/**
 * @fileoverview	./server/server.js
 *
 * @version         1.0
 *
 * @author          Nicolás Garcia <nicolasgarciacomp@gmail.com>
 *
 * History
 * v1.0 – Se creó el archivo
**/

// Require
require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Configuracion Global de Rutas
app.use(require('./routes/index.js'));

mongoose.connect('mongodb://localhost:27017/pedidos', (err) => {
	if(err) throw err;

	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
	console.log('Escuchando en el puerto: ', process.env.PORT);
});
