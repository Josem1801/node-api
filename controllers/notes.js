const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')


notesRouter.get('/', (req, res) => {
    res.send("<h1> Hello World </h1>")
})

notesRouter.get('/api/notes', async (req, res) => {
    const notes = await Note.find({}).populate("user", {
        username: 1,
        name: 1
    })
    res.json(notes)
})

notesRouter.get('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    
    Note.findById(id).then(note => {
        if(note){
            return res.json(note)
        }else{
            res.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
    
})

notesRouter.post('/api/notes', async (req, res, next) => {
    const {
        content, 
        important = false,
        userId
    } = req.body

    const user = await User.findById(userId)

    if(!content){
        return res.status(400).json({
            error: "note.content is missing"
        })
    }
    
    const newNote = new Note({
        content: content,
        date: new Date().toISOString(),
        important: important || false, 
        user: user._id
    })
    
    // newNote.save().then(savedNote => {
    //     res.json(savedNote)
    // })

    try{
        const savedNote = await newNote.save()
        
        user.notes = user.notes.concat(savedNote._id)
        await user.save()

        res.json(savedNote)
    } catch(error){
        next(error)
    }
})

notesRouter.put('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    const note = req.body

    const newNote = {
        content: note.content,
        important: note.important
    }

    Note.findByIdAndUpdate(id, newNote, {new: true}).then(result => {
        res.json(result)
    }).catch(err => console.log(err))
})

notesRouter.delete('/api/notes/:id', async (req,res, next) => {
    const {id} = req.params
    try{
        await Note.findByIdAndRemove(id)
        res.status(204).end()
    } catch(error){
        next(error)
    }

})

module.exports = notesRouter