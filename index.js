require('./mongo')
const express = require('express')
const logger = require('./loggerMiddleware')

const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handdleError = require('./middlewares/handdleError')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')

const app = express()

app.use(cors())

app.use(logger)

app.use(express.json())

app.use('/', notesRouter)

app.use('/api/users', usersRouter)

//Middleware
app.use(notFound)

app.use(handdleError)

// app.use((req, res) => {
//     console.log(req.path)
//     res.status(404).json({
//         error: "Not found"
//     })
// })

const PORT = process.env.PORT || 3001; 

const server = app.listen(PORT, () => {
    console.log(` El servidor esta corriendo en el puerto ${PORT}`)
})  


module.exports = {app, server}
