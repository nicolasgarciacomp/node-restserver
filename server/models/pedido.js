/**
 * @fileoverview	./server/models/pedido.js
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

let pedidoSchema = new Schema({
	total: {
		type: Number,
		required: [true, 'El total es necesario']
	},
	currency: {
		type: String,
		required: [true, 'El currency es necesario']
	},
	descripcion: {
		type: String,
		required: [true, 'La descripcion es necesaria']
	},
	return_url: {
		type: String,
		required: [true, 'El return_url es necesario']
	},
	reference: {
		type: String,
		required: [true, 'El reference es necesario']
	}
});

module.exports = mongoose.model('Pedido', pedidoSchema);