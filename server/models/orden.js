/**
 * @fileoverview	./server/models/orden.js
 *
 * @version         1.0
 *
 * @author          Nicolás Garcia <nicolasgarciacomp@gmail.com>
 *
 * History
 * v1.0 – Se creó el archivo
**/

// Require
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ordenSchema = new Schema({
	total: {
		type: Number,
		required: [true, 'El total es necesario']
	},
	descripcion: {
		type: String,
		required: [true, 'La descripcion es necesaria']
	},
	email: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Orden', ordenSchema);
