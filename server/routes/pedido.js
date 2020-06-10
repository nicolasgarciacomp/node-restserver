/**
 * @fileoverview	./server/routes/pedido.js
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
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');
const Pedido = require('../models/pedido.js');
const app = express();

let url = 'https://api.mobbex.com';

const instance = axios.create({
	headers: {'x-api-key': 'zJ8LFTBX6Ba8D611e9io13fDZAwj0QmKO1Hn1yIj',
			  'x-access-token': 'd31f0721-2f85-44e7-bcc6-15e19d1a53cc',
			  'x-lang': 'es',
			  'Content-Type': 'application/json',
			  'cache-control': 'no-cache',
			  'Postman-Token': 'a5b4fd48-3439-4e50-b6d2-64978b0213c4'
			 }
});

app.get('/pedidos', function(req, res) {
	Pedido.find()
		  .exec((err, pedidos) => {
		   		if(err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				Pedido.count((err, conteo) => {
					res.json({
						ok: true,
						pedidos,
						cuantos: conteo
					});
				});
		   });
});

app.get('/pedido/:ref', function(req, res) {
	let ref = req.params.ref;  

	instance.get(`${url}/2.0/transactions/coupons/${ref}`)
	     	.then((res) => {
				console.log(res.data);
		 	})
	     	.catch((error) => {
	     		console.error(error);
	     	});

	/* Se comenta lo realizado con xmlhttprequest */
	/*var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
		if(this.readyState === 4) {
		console.log(this.responseText);
		}
	});
	xhr.open("GET", `${url}/2.0/transactions/coupons/${ref}`);
	xhr.setRequestHeader("x-api-key", "zJ8LFTBX6Ba8D611e9io13fDZAwj0QmKO1Hn1yIj");
	xhr.setRequestHeader("x-access-token", "d31f0721-2f85-44e7-bcc6-15e19d1a53cc");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.send();*/
});

app.post('/pedido', function(req, res) {
	let body = req.body;
	let data = {
		total: body.total,
		currency: body.currency,
		reference: body.reference,
		description: body.description,
		return_url: 'localhost:3000/return/zxc',
		webhook: `localhost:3000/webhook/${body.reference}`,
		redirect: true,
		estado: 'Nuevo'
	}
	let pedido = new Pedido(data);

	pedido.save((err, pedidoDB) => {
		if(err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			pedido: pedidoDB
		});
	});

	instance.post(`${url}/p/checkout`, data)
	     	.then((res) => {
				console.log(res);
		 	})
		 	.catch((error) => {
				console.error(error);
		 	});

	/* Se comenta lo realizado con xmlhttprequest */
	/*var data = JSON.stringify({
		"total": body.total,
		"currency": body.currency,
		"reference": body.reference,
		"description": body.descripcion,
		"return_url": body.return_url,
		"webhook": "https://mobbex.com/sale/webhook?user=1234",
		"redirect": false
	});
	  
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	  
	xhr.addEventListener("readystatechange", function () {
		if(this.readyState === 4) {
			console.log(this.responseText);
		}
	});
	  
	xhr.open("POST", "https://api.mobbex.com/p/checkout");
	xhr.setRequestHeader("x-api-key", "zJ8LFTBX6Ba8D611e9io13fDZAwj0QmKO1Hn1yIj");
	xhr.setRequestHeader("x-access-token", "d31f0721-2f85-44e7-bcc6-15e19d1a53cc");
	xhr.setRequestHeader("x-lang", "es");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("Postman-Token", "a5b4fd48-3439-4e50-b6d2-64978b0213c4");
	
	xhr.send(data);*/
});

app.post('/webhook/:ref', (req, res) => {  
	let ref = req.params.ref;
	
	Pedido.find({'reference': ref})
		  .exec((err, pedido) => {
		  		if(err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				res.json({
					ok: true,
					pedido: pedido
				});
		   });
});

module.exports = app;
