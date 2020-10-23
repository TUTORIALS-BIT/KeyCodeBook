const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true }, //Nombre libro
    author: { type: String, required: true },//Nombre autor del libro
    pageNumber: { type: Number }, //Número de páginas
    publisher: { type: String, required: true }, //Editorial
    publicationDate: { type: Date }, //Fecha de publicación
    //genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }//Un libro tiene solo un genero.
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]//Un libro puede tener muchos generos.
})

module.exports = mongoose.model('Book', bookSchema)

/** RELACIONES EN MONGO */

/** { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' } => solo un genero => 'idGenero'  */

/** [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] Muchos generos ['idUno', 'idDos'] */
