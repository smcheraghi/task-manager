const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

// app.get('/tasks', (req, res) => {
//     Task.find({}).then((tasks) => res.send(tasks)).catch((e) => res.status(500).send())
// })
router.get('/tasks', async (req, res) => {
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
router.get('/tasks/:id', async (req, res) => {
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
router.post('/tasks', async (req, res) => {
    try {
        const task = await new Task(req.body).save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/tasks/:id', async(req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router