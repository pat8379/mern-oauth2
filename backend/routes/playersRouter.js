const asyncHandler = require('express-async-handler')
const playersRouter = require('express').Router()
const Player = require('../models/playersModel')
const userPlayer = require('../models/userSpecificPlayerModel')

playersRouter.use((req,res,next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
})

playersRouter.get('/', asyncHandler(async (req,res,next) => {
    const players = await Player.find()
    res.json(players)
}))

playersRouter.get('/account/specificPlayer', asyncHandler(async (req,res,next) => {
    const userSpecific = await userPlayer.find({ user: req.user.id })
        .populate('user', ['displayName', 'firstName'])
        .lean()
    // console.log(userSpecific) 
    res.send(userSpecific)
    // res.json("Bithc")
}))

playersRouter.get('/:playerName', asyncHandler(async (req,res,next) => {
    const players = await Player.find({playersName: req.params.playerName})
    res.send(players)
}))

playersRouter.post('/', asyncHandler(async (req,res,next) => {
    // console.log(req.body.text)
    const player = await Player.create({
        playersName: req.body.playersName,
        rating: req.body.rating,
        position: req.body.position,
        team: req.body.team
    })
    res.send(player)
}))

playersRouter.post('/specificPlayer', asyncHandler( async(req,res,next) => {
    // console.log(req.user)
    let modelType
    if (req.user.googleId) {
        modelType = 'OAuth'
        console.log('Got OAuth specific player post')
    } else if (req.user.username) {
        modelType = 'User'
    }
    const userSpecific = await userPlayer.create({
        user: req.user.id,
        playersName: req.body.playersName,
        rating: req.body.rating,
        position: req.body.position,
        team: req.body.team,
        modelType: modelType
    })
    res.send(userSpecific)
}))

playersRouter.delete('/:playerName', asyncHandler(async(req,res,next) =>{
    const player = await Player.deleteOne({playersName: req.params.playerName})
    res.send(player)
}))

module.exports = playersRouter