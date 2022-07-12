const asyncHandler = require('express-async-handler')
const passport = require('passport')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/usersModel')

usersRouter.post('/login', passport.authenticate("local", {failureMessage: true}), (req,res) => {
    // console.log(req.user)
    res.send("sent")
})

usersRouter.post('/register', asyncHandler(async (req,res,next) => {
    const {username, password} = req.body
    if (username && password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
            username: username,
            password: hashedPassword
        }
        const user = await User.create(newUser)
        res.send(user)
    } else {
        res.status(400).send("Wrong input")
    }
}))

// usersRouter.get('/all', asyncHandler(async(req,res,next) => {
//     const all = await User.find()
//     res.send(all)
// }))

usersRouter.get('/count', (req, res, next) => {
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }
    res.send(`Visited ${req.session.viewCount} times`)
})

usersRouter.post('/logout', (req,res,next) => {
    req.session.destroy()
    req.logout(req.user, err => {
        if(err) return next(err)
        // req.session.destroy()
        // res.send("log out")
    })
    // res.send("Log out")
    // res.redirect('/login');

})

module.exports = usersRouter