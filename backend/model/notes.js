const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    note: {
        type: "string",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("notes", notesSchema)