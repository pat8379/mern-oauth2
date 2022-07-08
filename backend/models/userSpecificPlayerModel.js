const mongoose = require('mongoose')

const userPlayerSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'modelType'
        },
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
        },
        modelType: {
            type: String,
            enum: ['User', 'OAuth']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('userPlayer', userPlayerSchema)
