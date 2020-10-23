module.exports = (app) => {
    const genre = require('../controllers/genre')

    app.post('/genre/create', genre.create)
    app.put('/genre/update/:id', genre.update)
}