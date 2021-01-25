//npm run dev
const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
// const { ObjectID } = require('mongodb')
// const testRouter = require('./routers/test')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.port || 3000

app.use(express.json())                             // To parse the body of request

// app.use(testRouter)
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`))