const mongoose = require("mongoose")
const { Schema } = mongoose


const UserList = new Schema ({
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = UserList

