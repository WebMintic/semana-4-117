//const { where } = require('sequelize/types');
//const { where } = require('sequelize/types');
const models = require('../models');

exports.add = async (req, res, next) => {
    try {
         const categotia = await models.Categoria.findOne({ where: {nombre: req.body.nombre}});
        if(categotia){
             res.status(409).send({message:'Sorry your request has a conflict with our system state, maybe the nombre is already in use'});
        }else{
             const categotia = await models.Categoria.create(req.body);
             res.status(200).json(categotia);
        }
    } catch (error) {
         res.status(500).send({message: 'Error!!'});
         next(error);
    }
}
exports.list = async (req, res, next) => {
    try {
        const categotia = await models.Categoria.findAll({
            include: [{
                model: models.Articulo,
                as: 'articulo',                
            }]
        });
        if(categotia){
            res.status(200).json(categotia);
        }else{
            res.status(404).send({message:'There is not categotia in the system'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error!!'});
        next(error);
    }
}

exports.list2 = async (req, res, next) => {
    try {
        const categotia = await models.Categoria.findAll({
            include: [{
                model: models.Articulo,
                as: 'articulo',                
            }],
            where:{
                id: req.params.catId
            }
        });
        if(categotia){
            res.status(200).json(categotia);
        }else{
            res.status(404).send({message:'There is not categotia in the system'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error!!'});
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const categotia = await models.Categoria.findOne({ where: {id: req.body.id}});
        if(categotia){
            const categotia = await models.Categoria.update(req.body,{ where: {id: req.body.id}});
            res.status(200).json(categotia);
        }else{
            res.status(409).send({message:'Sorry your request has a conflict with our system state, maybe the email is already in use'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error!!'});
        next(error);
    }
}

exports.activate = async (req, res, next) => {
    try {
        const categotia = await models.Categoria.findOne({ where: {id: req.body.id}});
        if(categotia){
            const categotia = await models.Categoria.update({estado: 1},{ where: {id: req.body.id}});
            res.status(200).json(categotia);
        }else{
            res.status(409).send({message:'Sorry your request has a conflict with our system state, maybe the email is already in use'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error!!'});
        next(error);
    }
}

exports.deactivate = async (req, res, next) => {
    try {
        const categotia = await models.Categoria.findOne({ where: {id: req.body.id}});
        if(categotia){
            const categotia = await models.Categoria.update({estado: 0},{ where: {id: req.body.id}});
            res.status(200).json(categotia);
        }else{
            res.status(409).send({message:'Sorry your request has a conflict with our system state, maybe the email is already in use'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error!!'});
        next(error);
    }
}