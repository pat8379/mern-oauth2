const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
    {
        playersName: {
            type: String,
            required: true,
            unique: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 99,
            required: true
        },
        position: {
            type: String,
            maxLength: 2,
            uppercase: true,
            required: true
        },
        team: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Player', playerSchema)