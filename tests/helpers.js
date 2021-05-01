const supertest = require('supertest')
const {app} = require('../index')
const User = require('../models/user')

const api = supertest(app)

const initialNotes = [
    {
        content: 'Aprendiendo Full-Stack',
        important: true,
        date: new Date()
    },
    {
        content: 'Conseguir trabajo en menos de 6 meses',
        important: false,
        date: new Date()
    },
    {
        content: "Esto me encanta en serio!!",
        important: true,
        date: new Date()
    }
]

const getUsers = async () => {
    const usersDBAfter = await User.find({})
    return usersAtEnd = usersDBAfter.map(user => user.toJSON())
}

const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')
    return {
        response, 
        contents: response.body.map(note => note.content),
        important: response.body.map(note => note.important)
    }
}


module.exports = {initialNotes, api, getAllContentFromNotes, getUsers}