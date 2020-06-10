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
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');
const Orden = require('../models/orden.js');
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

app.get('/ordenes', function(req, res) {
	Orden.find()
		  .exec((err, ordenes) => {
		   		if(err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				Orden.count((err, conteo) => {
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
	let data = {
		total: body.total,
		description: body.description,
		email: body.email
	}
	let orden = new Orden(data);

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

	instance.post(`${url}/p/payment_order`, data)
	.then((res) => {
	   console.log(res);
	})
	.catch((error) => {
	   console.error(error);
	});

	/* Se comenta lo realizado con xmlhttprequest */
    /*var data = JSON.stringify({
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
    
    xhr.send(data);*/
});

module.exports = app;
