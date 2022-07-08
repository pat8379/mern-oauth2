const passport = require('passport')
const oAuthRouter = require('express').Router()

oAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }))

oAuthRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureMessage: true }),
    (req, res) => {
        // res.send("sent")
        // console.log(req.user)
        res.redirect('/')
    }
  )

oAuthRouter.get('/logout', (req, res) => {
    req.logout()
})

module.exports = oAuthRouter