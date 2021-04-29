const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(logger)

app.use(express.json())

let notes = [
    {
        "id": 1,
        "content": "Me tengo que volver un programador sin estudios",
        "date": "2020-04-30%18:39:34.091Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Tengo que estudiar todos los dias",
        "date": "2020-04-30%18:39:34.091Z",
        "important": true
    },
    {
        "id": 3,
        "content": "Sin esfuerzo no hay recompenza",
        "date": "2020-04-30%18:39:34.091Z",
        "important": true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {"Context-Type": "application/json"})
//     response.end(JSON.stringify(notes)) 
// })

app.get('/', (req, res) => {
    res.send("<h1> Hello World </h1>")
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req,res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    if(!note || !note.content){
        return res.status(400).json({
            error: "note.content is missing"
        })
    }
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }
    console.log(newNote)
    notes = [...notes, newNote]
    res.json(newNote)
})

app.use((req, res) => {
    console.log(req.path)
    res.status(404).json({
        error: "Not found"
    })
})

const PORT = process.env.PORT || 3001; 

app.listen(PORT, () => {
console.log(` El servidor esta corriendo en el puerto ${PORT}`)
})  

