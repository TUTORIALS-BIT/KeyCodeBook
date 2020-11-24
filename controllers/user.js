const UserModel = require('../models/user')
const service = require('../services/index')
const nodemailer = require('nodemailer')
const bcript = require('bcryptjs')

/**
 * Método para almacenar un nuevo usuario
 * @param {*} req => Todo lo que enviamos desde el body (formulario)
 * @param {*} res => La respuesta que se devolverá
 */
exports.create = (req, res) => {

    /**
     * Validamos que todos los campos del formulario estén llenos.
     */
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Los datos son obligatoríos.'
        })
    }

    const user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        //password: req.body.password,
        password: bcript.hashSync(req.body.password),
        role: req.body.role,
        birthDate: req.body.birthDate,
        age: req.body.age
    })

    user.save()
    .then( (dataUser) => {
        const contentEmail = '<h1>Hola cómo estás</h1>'
        sendEmailInfo(dataUser.email, 'Bienvenido', contentEmail, '', res)
        res.send(dataUser)
    } )
    .catch( (error) => {
        res.status(500).send({
            message: error.message
        })
    } )
}

/**
 * Método para actualizar un usuario.
 * @param {*} req => Todo lo que enviamos desde el body (formulario)
 * @param {*} res => La respuesta que se devolverá
 */
exports.update = (req, res) => {
    /**
     * Validamos que todos los campos del formulario estén llenos.
     */
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Los datos son obligatoríos.'
        })
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        //password: bcript.hashSync(req.body.password),
        birthDate: req.body.birthDate,
        age: req.body.age
    }

    /**
     * findByIdAndUpdate => Método de mongoose que permite buscar por id y actualizar u usuario. Tiene los párametros:
     *  - El id del usuario. => req.params.id es el id que se envía por la URL.
     *  - Los datos nuevos.
     */
    UserModel.findByIdAndUpdate(req.params.id, user, {new: true})
    .then(
        (userUpdate) => {
            res.send(userUpdate)
        }
    ).catch(
        (error) => {
            res.status(500).send({
                message: error.message
            })
        }
    )

}

/**
 * Método para obtener todos los usuarios.
 * @param {*} req => Todo lo que enviamos desde el body (formulario) o url.
 * @param {*} res => La respuesta que se devolverá
 */
exports.getAll = (req, res) => {
    UserModel.find()
        .then( (users) => { res.send(users) } )
        .catch(
            (error) => {
                res.status(500).send({
                    message: error.message
                })
            }
        )
}

exports.login = (req, res) => {
    UserModel.findOne({email: req.body.email}, (error, dataUser) => {
        if(dataUser != null){
            //if(dataUser.password == req.body.password){
            if( bcript.compareSync(req.body.password, dataUser.password) ){
                res.send({ token: service.createToken(dataUser) })
            }else{
                res.status(400).send({
                    message: 'Los datos no coindicen'
                })
            }
        }else{
            res.status(400).send({
                message: 'Los datos no coindicen'
            })
        }
    })
}

exports.sendEmail = (req, res) => {
    const email = req.query.email
    const name = req.query.name
    requirements(email, name, res)
}

const requirements = (email, name, res) => {
    const contentEmail = `<h1>Mensaje desde el formulario de contacto</h1>
        Hola, hemos recibido un mensaje de ${name} con el correo ${email}, por favor comunicate.`
    sendEmailInfo('paola.cuadros@bit.institute', 'Formulario contacto', contentEmail, '', res)
}

const sendEmailInfo = (receiver, subject, contentEmail, contentTxt = '', res) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'falcontravelvip@gmail.com',
            pass: 'falcontravel2020+'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    })

    const configEmail = {
        from: 'Keycode Book',
        to: receiver,
        subject: subject,
        text: contentTxt,
        html: contentEmail
    }

    transport.sendMail(configEmail, (error, info) => {
        if (error){
            res.status(500).send({
                message: 'Error al enviar el correo ', error
            })
        }else{
            res.status(200).send({
                message: 'Correo enviado correctamente'
            })
        }
    })
}

