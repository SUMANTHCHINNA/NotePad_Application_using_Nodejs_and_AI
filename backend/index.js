const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const notesRouter = require("./routes/notes")

dotenv.config()
const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    })
)

app.use(express.json())
app.use(notesRouter)

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
