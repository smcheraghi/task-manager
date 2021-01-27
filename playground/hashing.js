const bcrypt = require('bcryptjs')

const myFunction = async() => {
    const password = 'ali1378'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedPassword)
    console.log(await bcrypt.compare(password, hashedPassword))
}

myFunction()