module.exports = (app) => {
    const genre = require('../controllers/genre')

    app.post('/genre/create', genre.create)
}