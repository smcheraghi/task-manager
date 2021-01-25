//npm run dev
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.port || 3000

app.use(express.json())                             // To parse the body of request

// app.post('/users', (req, res) => {
//     const user = new User(req.body).save().then((user) => res.status(201).send(user)).catch((e) => res.status(400).send(e.message))
// })
app.post('/users', async(req, res) => {
    try {
        const user = await new User(req.body).save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

// app.get('/users', (req, res) => {
//     User.find({}).then((users) => res.send(users)).catch((e) => res.status(500).send())
// })
app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})


// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => res.status(500).send())
// })
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()      
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if (!user){
            return res.status(404).send() 
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send('Document does not exist')
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// app.get('/tasks', (req, res) => {
//     Task.find({}).then((tasks) => res.send(tasks)).catch((e) => res.status(500).send())
// })
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// app.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id
//     Task.findById(_id).then((task) => {
//         if (!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e) => res.status(500).send())
// })
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


// app.post('/tasks', (req, res) => {
//     const task = new Task(req.body).save().then((task) => res.status(201).send(task)).catch((e) => res.status(400).send(e.message))
// })
app.post('/tasks', async (req, res) => {
    try {
        const task = await new Task(req.body).save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'desccription']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send('Not found')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => console.log(`Server is running on port ${port}`))