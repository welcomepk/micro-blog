const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

const events = []

app.post('/events', async (req, res) => {
    const event = req.body
    events.push(event)


    // posts service
    axios.post('http://localhost:4000/events', event)
        .then(res => {
            console.log("response from posts:4000", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://localhost:4000:', err.message)
        })

    // comments service
    axios.post('http://localhost:4001/events', event)
        .then(res => {
            console.log("response from comments:4001", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://localhost:4001:', err.message)
        })


    // query service
    axios.post('http://localhost:4002/events', event)
        .then(res => {
            console.log("response from query:4002", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://localhost:4002:', err.message)
        })


    // moderation service
    axios.post('http://localhost:4003/events', event)
        .then(res => {
            console.log("response from moderation:4003", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://localhost:4003:', err.message)
        })


    res.send({
        status: 'OK'
    })
})

app.get('/events', async (req, res) => {
    return res.send(events)
})

app.listen(4040, () => {
    console.log('events server is up on port', 4040);
})