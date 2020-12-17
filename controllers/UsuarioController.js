const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const request  = require('express');
const models = require('../models');
const db = require('../models');
const tokenServices = require('../services/token');

//Para hacer el login
exports.login = async (req, res, next) => {
    try{
        const user = await models.Usuario.findOne({where:{email: req.body.email}});
        //const rol = await models.usuario.findOne({where:{rol: req.body.rol}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password); //Validamos que el usuario existe y comparamos la contraseña
            if(passwordIsValid){
                const token = await tokenServices.encode(user);                    
                // const token = await tokenServices.encode(user, rol);   
                res.status(200).send({
                    auth: true,
                    tokenReturn: token //Devuelve el usuario
                }); //Se manda el código porque es correcto
            }else{
                res.status(401).json({
                    auth: false,
                    tokenReturn: null,
                    reason:'Datos incorrectos' //Contraseña incorrecta
            })}
        }else{
            res.status(404).json({
                error:'Usuario no registrado' //Usuario no existe en la base de datos
            })
        }
    }catch(error){
        res.status(500).send({
            message: 'Error->' + error
        })
        next(error); //Necesario para que no se bloquee la página
    }
};

//Para registrar
exports.register = async (req, res, next) => {
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            res.status(409).send({
                message: 'Your request has conflict - repeating info'
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await db.Usuario.create(req.body);
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }
};

//Para listar
exports.list = async (req, res, next) => {
    try {
        const user = await db.Usuario.findAll();
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).send({
                message: 'The user doesn´t exists'
            })
        }
    } catch (error) {
        res.status(500).sind({
            message: 'An error ocured'
        })
        next(error);
    }
};

//Para actualizar
exports.update = async (req, res, next) => {
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            const user = await db.Usuario.update({name: req.body.name},
            {
            where: {
                email: req.body.email
            }            
        });
            res.status(200).json(user);
        }else{
            req.status(404).send({
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }
};