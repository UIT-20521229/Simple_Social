const usersRouter = require('./users.routes');

function route(app) {
    app.use('/users', usersRouter)
}

module.exports = route;