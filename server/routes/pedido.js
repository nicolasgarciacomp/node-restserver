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
const _ = require('underscore');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Pedido = require('../models/pedido.js');
const app = express();

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
	 
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
		console.log(this.responseText);
		}
	});
	xhr.open("GET", `https://api.mobbex.com/2.0/transactions/coupons/${ref}`);
	xhr.setRequestHeader("x-api-key", "zJ8LFTBX6Ba8D611e9io13fDZAwj0QmKO1Hn1yIj");
	xhr.setRequestHeader("x-access-token", "d31f0721-2f85-44e7-bcc6-15e19d1a53cc");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.send();
});

app.post('/pedido', function(req, res) {
	let body = req.body;
	let pedido = new Pedido({
		total: body.total,
		currency: body.currency,
		descripcion: body.descripcion,
		return_url: body.return_url,
		reference: body.reference
	});

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

	/***************************************/
	var data = JSON.stringify({
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
		if (this.readyState === 4) {
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
	
	xhr.send(data);
});

module.exports = app;
