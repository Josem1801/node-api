const mongoose = require('mongoose')
const {server} = require('../index')
const Note = require("../models/Note")

const {initialNotes, api, getAllContentFromNotes} = require("./helpers")


beforeEach(async () => {
    await Note.deleteMany()

    //Secuential
    for(const note of initialNotes){
        const newObject = new Note(note)
        await newObject.save()
    }
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect('Content-Type', /application\/json/)
        .expect(200)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    
    expect(response.body).toHaveLength(initialNotes.length)
})

test('The first note is about Jose Rosales', async () => {
    const { contents } = await getAllContentFromNotes()
    expect(contents).toContain("Aprendiendo Full-Stack")
})

test('A valid note can be added', async () => {
    const newNote = {
        content: "Proximamente async/await",
        important: true
    }

    await api.post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect("Content-Type",/application\/json/)

    const {response, contents} = await getAllContentFromNotes()

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
})

test('A note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api.post('/api/notes')
        .send(newNote)
        .expect(400)


    const response = await api.get('/api/notes')
    
    expect(response.body).toHaveLength(initialNotes.length)
})

test("A note can be deleted", async () => {
    const {response: firstResponse} = await getAllContentFromNotes()
    const {body: notes} = firstResponse
    const noteToDeleted = notes[0]

    await api
        .delete(`/api/notes/${noteToDeleted.id}`)
        .expect(204)

    const {contents, response:secondResponse} = await getAllContentFromNotes()
    
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDeleted)
})

test("A note that do not exist can not be deleted", async () => {

    await api
        .delete("/api/notes/1234")
        .expect(400)

    const {response} = await getAllContentFromNotes()
    
    expect(response.body).toHaveLength(initialNotes.length)
})

test("A note has been edited", async () => {
    const {response: firstResponse} = await getAllContentFromNotes()
    const {body: notes} = firstResponse
    const noteToEdit = notes[0]

    const noteEdited = {
        content: "Este contenido ha sido reemplazado", 
        important: false
    }

    await api.put(`/api/notes/${noteToEdit.id}`)
    .send(noteEdited)
    .expect(200)
    .expect("Content-Type", /application\/json/)

    const {contents, important, response:secondResponse} = await getAllContentFromNotes()
    
    expect(secondResponse.body).toHaveLength(initialNotes.length)
    expect(contents).toContain(noteEdited.content)
    expect(important).toContain(noteEdited.important)


})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})