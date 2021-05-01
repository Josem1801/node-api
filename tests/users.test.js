const bcrypt = require('bcrypt')
const User = require("../models/User")
const { api, getUsers } = require('./helpers')
const {server} = require('../index')
const mongoose = require('mongoose')

describe.only('Creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
   
        const passwordHash = await bcrypt.hash("1234", 10)
        const user = new User({username: "pep23", name: "pepito", passwordHash})

        await user.save()
    })

    test('works a expected creating a fresh username', async () => {

        const usersAtStart = await getUsers()

        const newUser = {
            username: "roro",
            name: "Rodrigo", 
            password: "92834"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await getUsers()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const username = usersAtEnd.map(user => user.username)
        
        expect(username).toContain(newUser.username)
    })
    
    afterAll(() => {
        mongoose.connection.close()
        server.close()
    })
})

