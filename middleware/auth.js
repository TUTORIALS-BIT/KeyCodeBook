const service = require('../services/index')

/**
 * Método para validar si la persona tiene una sesión iniciada.
 * @param {*} req => Todos los parametros que se reciben
 * @param {*} res => Respuesta que se devuelve.
 * @param {*} next => Middleware, si todo sale bien, se ejecuta el método que necesitamos que se ejecute.
 */
exports.auth = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(400).send({
            message: 'No tienes permiso para realizar esta operación'
        })
    }

    const token = req.headers.authorization.split(' ')[1]
    service.decodeToken(token)
    .then(
        (respon)=> {
            req.user = respon
            next()
        }
    )
    .catch(
        ( error) =>{
            res.status(error.status).send({
                message: error.message
            })
        }
    )

}