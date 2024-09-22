const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

const events = []

app.get('/events', (req, res) => {
    console.log(events);
    return res.send({ events })
})

app.post('/events', async (req, res) => {
    const event = req.body
    console.log("event-bus event ===> ", event);
    events.push(event)

    // posts service
    axios.post('http://posts-clusterip-srv:4000/events', event)
        .then(res => {
            console.log("response from posts:4000", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://posts-clusterip-srv:4000:', err.message)
        })

    // comments service
    axios.post('http://comments-clusterip-srv:4001/events', event)
        .then(res => {
            console.log("response from comments:4001", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://comments-clusterip-srv:4001:', err.message)
        })


    // query service
    axios.post('http://query-clusterip-srv:4002/events', event)
        .then(res => {
            console.log("response from query:4002", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://query-clusterip-srv:4002:', err.message)
        })


    // moderation service
    axios.post('http://moderation-clusterip-srv:4003/events', event)
        .then(res => {
            console.log("response from moderation:4003", res.data);

        })
        .catch(err => {
            console.error('Failed to send event to http://moderation-clusterip-srv:4003:', err.message)
        })


    res.send({
        status: 'OK'
    })
})
app.listen(4040, () => {
    console.log('events server is up on port', 4040);
})