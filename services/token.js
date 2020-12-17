var jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async (token) => {
    let localID =  null;
    try {
        const { id } = await token.decode(token);
        localID = id;
    } catch (error) {
        
    }
    const user = await models.Usuario.findOne({where : {
        id: localID,
        state: 1
    }});
    if(user){
        const token = encode(user);
        return {
            token,
            rol: user.rol
        }
    }else{
        return false;
    }
};

module.exports = {
    encode: async(user) =>{
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            state: user.state,
        }, 'config.secret', {
            expiresIn: 86400,
        });

        return token;
    },
    decode: async(token) =>{
        try {
            const { id } = await jwt.verify(token, 'config.secret')
            const user = await models.Usuario.findOne({where: {
                id: id,
                state: 1
            }});
            if(user){
                return user;
            }else{
                return false;
            }
        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}

module.exports = {

    //generar el token
    // encode: async(id, rol) => {
        encode: async(user) => {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            state: user.state,
        }, 'config.secret', {
            expiresIn: 86400,
        });

        return token;
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            const { id } = await jwt.verify(token, 'config.secret')
            const user = await models.Usuario.findOne({where: {
                id: id,
                state: 1
            }});
            if(user){
                return user;
            }else{
                return false;
            }
        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}