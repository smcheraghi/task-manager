// Bring it to end of index.js and run
const Task = require('./models/task')
const User = require('./models/user')
const makeRelationUserTask = async () => {
    // const task = await Task.findById('6011f93862088148cce4eccc')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('6011f04a8676e34eac39ce07')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

makeRelationUserTask()