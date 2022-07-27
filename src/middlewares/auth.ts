import express from 'express'
const jwt = require('jsonwebtoken');
module.exports = {

	verify(req, res, next){
		const bearer = req.headers['authorization'];
		if (typeof bearer !== 'undefined'){
			const token = bearer.split(" ")[1];
			req.token = token;
			jwt.verify(req.token, 'secret', (error, authData) => {
				if (error){
					res.status(403).json({message: 'no tiene permisos'});
				}else{
					next();
				}
			});
		}else{
			res.status(403).json({message: 'falta token'});
		}
	}

}