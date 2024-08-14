const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(express.json())

app.listen(8000, () => {
    console.log('events server is up on port', 8000);
})