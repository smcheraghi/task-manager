//mongod --dbpath="/Users/smche/Desktop/nodjs/mongodb-data"
const mongoose = require('mongoose')

const database_Name = 'task-manager-api'
mongoose.connect('mongodb://127.0.0.1:27017/' + database_Name, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})






