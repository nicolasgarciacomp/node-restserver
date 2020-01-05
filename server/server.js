require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuracion Global de Rutas
app.use(require('./routes/index.js'));

mongoose.connect('mongodb://localhost:27017/cafe', (err) => {
	
	if(err) throw err;

	console.log('Base de datos ONLINE');

});
 
app.listen(process.env.PORT, () => {
	console.log('Escuchando en el puerto: ', process.env.PORT);
});
