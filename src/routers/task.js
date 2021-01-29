const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/authentication')
const router = new express.Router()

// app.get('/tasks', (req, res) => {
//     Task.find({}).then((tasks) => res.send(tasks)).catch((e) => res.status(500).send())
// })
router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {}
        const sort = {}


        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        // const tasks = await Task.find({})
        // await req.user.populate('tasks').execPopulate()                 // const tasks = await Task.find({owner: req.user._id})
        
        await req.user.populate({
            path: 'tasks', 
            match,
            options: {
                limit: parseInt(req.query.limit),                            // Get /tasks?limit=10&skip=0      --> paginating --> page 120
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     // createdAt: -1                                                 // Get /tasks?sortBy=createdAt:desc           desc -> -1        asce -> 1
                //     completed: -1
                // }
            }
            // match: {
            //     completed: false,
            // }
        }).execPopulate()                     // Get /tasks?completed=true
        res.send(req.user.tasks)
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
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    console.log(_id)
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id } )
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
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'desccription']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete( {_id: req.params.id, owner: req.user._id} )
        if (!task) {
            return res.status(404).send('Not found')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router