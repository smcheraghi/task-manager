// CRUD create, read, update, delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database!')
    }

    const db = client.db(databaseName)

    //================================================Insert method
    // db.collection('users').insertOne({
    //     name: 'Ali',
    //     age: 57
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([{
    //     name: 'Emad',
    //     age: 27
    // }, {
    //     name: 'reza',
    //     age:50
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

//     // ===================================================== Read data
//     db.collection('users').findOne({ _id: new ObjectID('60050f361993974efcdfc4af') }, (error, user) => {
//         if (error) {
//             return console.log('Unable to fetch the data')
//         }
        
//         console.log(user)
//     })

//     db.collection('users').find({ name: 'Ali' }).toArray((error, users) => {
//         if (error) {
//             return console.log('Unable to fetch the data')
//         }
        
//         console.log(users)
//     })

//     db.collection('users').find({ name: 'Ali' }).count((error, count) => {
//         if (error) {
//             return console.log('Unable to fetch the data')
//         }
        
//         console.log(count)
//     })

// //==================================================================== Update data

//     db.collection('users').updateOne({
//         _id: new ObjectID("60050f361993974efcdfc4af")
//     }, {
//         $set: {
//             name: 'Ghazanfar'
//         }
//         }).then((result) => {
//             console.log(result)
//         }).catch((error) => {
//             console.log(error)
//         })

//     db.collection('users').updateOne({
//         _id: new ObjectID("60050f361993974efcdfc4af")
//     }, {
//         $inc: {
//             age: 20
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

//     db.collection('users').updateMany({
//         name: 'RezaAli'
//     }, {
//         $set: {
//             name: 'RezaAliii'
//         }
//     }).then((result) => {
//         console.log(result.modifiedCount)
//     }).catch((error) => {
//         console.log(error)
//     })

//==================================================================== Delete data

    db.collection('users').deleteMany({
        name:'reza'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})