const jwt = require('jsonwebtoken')

const myFunc = async() => {
    const token = jwt.sign({ _id: 'abcd123'}, 'RandonSeriesOfAnyCharacter', {expiresIn: '7 days'})
    console.log(token)
    const verification = jwt.verify(token, 'RandonSeriesOfAnyCharacter')
    console.log(verification)
}

myFunc()
