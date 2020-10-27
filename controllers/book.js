const BookModel = require('../models/book')

/**
 * Método para registrar un nuevo libro
 * @param {*} req => Todo lo que se recibe.
 * @param {*} res => Respuesta que se devuelve.
 */
exports.create = (req, res) => {

    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Todos los datos deben estar llenos.'
        })
    }

    const book = new BookModel({
        name: req.body.name,
        author: req.body.author,
        pageNumber: req.body.pageNumber,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        genre: req.body.genre
    })

    book.save().then(
        data => {
            res.send(data)
        }
    ).catch(
        error => {
            return res.status(500).send({
                message: error.message
            })
        }
    )
}

/**
 * Método para modificar la información de un libro.
 * @param {*} req => Todo lo que se recibe.
 * @param {*} res => Respuesta que se devuelve.
 */
exports.update = (req, res) => {
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Todos los datos deben estar llenos.'
        })
    }

    const book = {
        name: req.body.name,
        author: req.body.author,
        pageNumber: req.body.pageNumber,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        genre: req.body.genre
    }

    BookModel.findByIdAndUpdate(req.params.id, book, {new: true})
    .then(
        (bookUpdated) => {
            res.send(bookUpdated)
        }
    )
    .catch(
        (error) => {
            return res.status(500).send({
                message: error.message
            })
        }
    )
}

/**
 * Método para listar todos los libros que están en la plataforma.
 * @param {*} req => Todo lo que se recibe.
 * @param {*} res => Respuesta que se devuelve. 
 */
exports.getAll = (req, res) => {
    BookModel.find()
        .populate('genre') //Método el cual nos permite traer los datos de la colección con la que se tiene la relación.
        .exec() //Se ejecuta la consulta.
        .then( (books) => res.send(books) )
        .catch(
            (error) => {
                res.status(500).send({
                    message: error.message
                })
            }
        )
}

/**
 * Método para obtener un libro por el id
 * @param {*} req => Todo lo que se recibe.
 * @param {*} res => Respuesta que se devuelve. 
 */
exports.getOne = (req, res) => {
    BookModel.findById(req.params.id)
        .populate('genre')
        .exec()
        .then( (book) => { res.send(book) } )
        .catch(
            (error) => {
                res.status(500).send({
                    message: error.message
                })
            }
        )
}

/**
 * Método para eliminar un libro por el id
 * @param {*} req => Todo lo que se recibe.
 * @param {*} res => Respuesta que se devuelve. 
 */
exports.deleteOne = (req, res) => {
    BookModel.findByIdAndRemove(req.params.id)
        .then( (book) => { res.send(book) } )
        .catch(
            (error) => {
                res.status(500).send({
                    message: error.message
                })
            }
        )
}