/**
 * @fileoverview	./server/routes/orden.js
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
const Orden = require('../models/orden.js');
const app = express();

app.get('/orden', function(req, res) {
	Orden.find()
		  .exec((err, ordenes) => {
		   		if(err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				Pedido.count((err, conteo) => {
					res.json({
						ok: true,
						ordenes,
						cuantas: conteo
					});
				});
		   });
});

app.post('/orden', function(req, res) {
	let body = req.body;
	let orden = new Orden({
		total: body.total,
		description: body.description,
		email: body.email
	});

	orden.save((err, ordenDB) => {
		if(err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			orden: ordenDB
		});
	});

	/***************************************/
    var data = JSON.stringify({
        "total": body.total,
        "description": body.description,
        "email": body.email
    });
      
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    
    xhr.open("POST", "https://api.mobbex.com/p/payment_order");
    xhr.setRequestHeader("x-api-key", "zJ8LFTBX6Ba8D611e9io13fDZAwj0QmKO1Hn1yIj");
    xhr.setRequestHeader("x-access-token", "d31f0721-2f85-44e7-bcc6-15e19d1a53cc");
    xhr.setRequestHeader("x-lang", "es");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "d6c06149-80b6-45a3-84ee-da0a8ba737a3");
    
    xhr.send(data);
});

module.exports = app;
