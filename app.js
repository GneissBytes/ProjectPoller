if (process.env.NODE_ENV !== "production") require('dotenv').config()


const mongoose = require("mongoose")
const express = require('express')
const app = express()

const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/react-app'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console.log("error connecting to database")));
db.once("open", () => (console.log("connection to database established")));



app.get('*', (req, res) => {
    res.send('<h1>It is I, venomous one!</h1>')
});
port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`listening at ${port}`)
})