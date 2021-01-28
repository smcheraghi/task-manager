//npm run dev
// const User = require('./models/user')
// const Task = require('./models/task')
// const { ObjectID } = require('mongodb')
// const testRouter = require('./routers/test')

require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.port || 3000

// //
// // Without middleware: new request -> run route handler
// //
// // With middleware: new request -> do something -> run route handler
// // Define middleware with use
//
// app.use((req, res, next) => {
//     console.log(req.method, " ", req.path)
//     next()
// })

app.use(express.json())                                                     // To parse the body of request
app.use(userRouter)
app.use(taskRouter)
// app.use(testRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`))




