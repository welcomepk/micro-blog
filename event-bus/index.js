const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

const events = []

app.post('/events', async (req, res) => {
    const event = req.body
    events.push(event)

    try {

        // posts service
        fetch('http://localhost:4000/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event)
        })

        // comments service
        await fetch('http://localhost:4001/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event)
        })

        // query service
        fetch('http://localhost:4002/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event)
        })

        // moderation service
        fetch('http://localhost:4003/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event)
        })

        res.send({
            status: 'OK'
        })

    } catch (error) {
        console.log("event-bus ===> ", error.message || error);
        res.send({
            error: error.message || "Something went wrong"
        })
    }
})

app.get('/events', async (req, res) => {
    return res.send(events)
})

app.listen(4040, () => {
    console.log('events server is up on port', 4040);
})