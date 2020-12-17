const db = require('../models');

//Para listar
exports.list = async (req, res, next) => {
    try {        
        const register = await db.Articulo.findAll({
            include: [{
                model: db.Categoria,
                as: 'categoria',                
            }]
        });
        if(register){
            res.status(200).json(register);
        }else{
            res.status(404).send({
                message: 'Article doesn´t exists'
            })
        }
    } catch (error) {
        res.status(500).sind({
            message: 'An error ocured'
        })
        next(error);
    }
};

//Para add
exports.add = async (req, res, next) => {
    try {
        const register = await db.Articulo.create(req.body);
        res.status(200).json(register);
    } catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }
};

//Para actualizar
exports.update = async (req, res, next) => {
    try {
        const register = await db.Articulo.update({codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, categoriaId: req.body.categoriaId},
            {
            where: {
                id: req.body.id
            }            
        });
        res.status(200).json(register);
    } catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }
};

//Para activar (estado: 1)
exports.activate = async (req, res, next) => {
    try {
        const register = await db.Articulo.update({estado: 1},
            {
            where: {
                id: req.body.id
            }            
        });
        res.status(200).json(register);
    } catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }
};

//Para desactivar (estado: 0)
exports.deactivate = async (req, res, next) => {
    try {
        const register = await db.Articulo.update({estado: 0},
            {
            where: {
                id: req.body.id
            }            
        });
        res.status(200).json(register);
    } catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }
};