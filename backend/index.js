const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const notesRouter = require("./routes/notes")
const path = require("path")

dotenv.config()
const app = express()

app.use(cors())

app.use(express.json())
app.use(notesRouter)

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 9000
const mongoUrl = process.env.MONGODB

mongoose
    .connect(mongoUrl)
    .then(() => {
        app.listen(port, () => {
            console.log(`The server running on PORT ${port}`)
        })
    })
    .catch((error) => {
        console.error("Error in connecting DB:", error)
    })
