const mongoose = require('mongoose')
const validator = require('validator')

const database_Name = 'task-manager-api'
mongoose.connect('mongodb://127.0.0.1:27017/' + database_Name, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")){
                throw new Error('can not contain password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

const me = new User({
    name: '   Ali   ',
    email: '        ALI@GMAIL.COM       ',
    password: '123'

})


me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})