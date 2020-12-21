var jwt = require('jsonwebtoken');
const models = require('../models');
const secretEncode = require('../secret/secret.json')

const checkToken = async(token) =>{

    let localID = null;
    try{
        const { id } = await token.decode(token);
        localID = id;
    }catch(e){
        return false;
    }
    const user = await models.Usuario.findOne({where: {id: localID, estado:1}})
    if(user){
        const token = encode(user); 
        return token;
    }else{
        return false;
    }
}

module.exports = {

    //generar el token
    encode: async(user) => {
        const token = jwt.sign({
            id: user.id,
            main: user.name,
            email: user.email,
            rol: user.rol
        },secretEncode.secrect, { //Puede ser cualquier texto (frase de seguridad)
            expiresIn: 3600,
        }
        );
        return token;
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            const { id } = await jwt.verify(token ,secretEncode.secrect);
            const user = await models.Usuario.findOne({where: {id : id, estado: 1}})
            if(user){
                return user;
            }else{
                return false
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken
        }

    }
}