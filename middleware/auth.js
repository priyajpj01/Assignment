const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        console.log("inside auth function")
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        //Verifying token using token and secret Key
        const decoded = jwt.verify(token,"abcd")
        console.log(decoded)
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })
console.log(user)
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        console.log(req.user)
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth