//npm run dev
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.port || 3000

app.use(express.json())                             // To parse the body of request

app.post('/users', (req, res) => {
    const user = new User(req.body).save().then((user) => res.status(201).send(user)).catch((e) => res.status(400).send(e.message))
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body).save().then((task) => res.status(201).send(task)).catch((e) => res.status(400).send(e.message))
})

app.listen(port, () => console.log(`Server is running on port ${port}`))