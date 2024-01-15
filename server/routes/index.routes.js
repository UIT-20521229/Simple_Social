const usersRouter = require('./users.routes');
const messagesRouter = require('./messages.routes');
const postsRouter = require('./posts.routes');

function route(app) {
    // router users 
    app.use('/users', usersRouter)
    // router messages
    app.use('/messages', messagesRouter)
    // router posts
    app.use('/posts', postsRouter)
}

module.exports = route;