require("dotenv").config()
const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env
const mongoose = require("mongoose")

const connectionString = NODE_ENV ==='test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log("Database Conected")
    })
    .catch((e) => {
        console.log("hola", e)
    })


// Note.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })

// const note = new Note({
//     content: "Mongo db es increible",
//     date: new Date(),
//     important: true
// })

// note.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch((e) => { 
//         console.error(e)
//     })