const models = require('../models');

exports.list = async (req, res, next) => {
    try {
        const articulo = await models.Articulo.findAll();
        if(articulo){
            res.status(200).json(articulo);
        }else{
            res.status(404).send({message:'There is not articulo in the system'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error!!'});
        next(error);
    }
}

exports.add = async (req, res, next) => {
    try {
        const articulo = await models.Articulo.findOne({ where: {codigo: req.body.codigo}});
        if(articulo){
             res.status(409).send({message:'Sorry your request has a conflict with our system state, maybe the nombre is already in use'});
        }else{
             const articulo = await models.Articulo.create(req.body);
             res.status(200).json(articulo);
        }
    } catch (error) {
         res.status(500).send({message: 'Error!!'});
         next(error);
    }
}
exports.update = async (req, res, next) => {
    try {
        const articulo = await models.Articulo.findOne({ where: {id: req.body.id}});
        if(articulo){
            const articulo = await models.Articulo.update(req.body,{ where: {id: req.body.id}});
            res.status(200).json(articulo);
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
        const articulo = await models.Articulo.findOne({ where: {id: req.body.id}});
        if(articulo){
            const articulo = await models.Articulo.update({estado: 1},{ where: {id: req.body.id}});
            res.status(200).json(articulo);
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
        const articulo = await models.Articulo.findOne({ where: {id: req.body.id}});
        if(articulo){
            const articulo = await models.Articulo.update({estado: 0},{ where: {id: req.body.id}});
            res.status(200).json(articulo);
        }else{
            res.status(409).send({message:'Sorry your request has a conflict with our system state, maybe the email is already in use'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error!!'});
        next(error);
    }
}