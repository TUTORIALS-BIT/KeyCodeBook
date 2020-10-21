module.exports = (app) => {
    const user = require('../controllers/user')
    app.post('/user/create', user.create)
    app.put('/user/update/:id', user.update)
}