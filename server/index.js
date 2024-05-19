const express = require('express')
const db = require('./models')
const cors = require('cors')

const app = express() 
app.use(express.json())
app.use(cors())

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001!")
    })
})

const PersonRouter = require("./routes/Person.route.js")

app.use("/api/v1/person", PersonRouter)
