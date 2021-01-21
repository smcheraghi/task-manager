const mongoose = require('mongoose')

const database_Name = 'task-manager-api'
mongoose.connect('mongodb://127.0.0.1:27017/' + database_Name, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Ali',
    age: 37
})


me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})