const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

app.post('/events', async (req, res) => {
    const event = req.body

    try {
        axios.post('http://localhost:4000/events', event)
        axios.post('http://localhost:4001/events', event)
        // axios.post('http://localhost:4002/events', event)

    } catch (error) {
        console.log(error.message || error);
    }

    res.send({
        status: 'OK'
    })
})

app.listen(4040, () => {
    console.log('event-bus server is up on port', 4040);
})  