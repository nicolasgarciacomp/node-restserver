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
	reference: {
		type: String,
		required: [true, 'El reference es necesario']
	},
	description: {
		type: String,
		required: [true, 'La descripcion es necesaria']
	},
	return_url: {
		type: String,
		required: [true, 'El return_url es necesario']
	},
	webhook: {
		type: String,
		required: [true, 'El webhook es necesario']
	},
	redirect: {
		type: Boolean,
		required: [true, 'El redirect es necesario']
	},
	estado: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Pedido', pedidoSchema);
