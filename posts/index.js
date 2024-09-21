const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

let posts = {};

app.delete('/posts/all', async (req, res) => {
    posts = {}
    return res.send('posts removed')
})

app.get('/posts', async (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body;

    posts[id] = {
        id,
        title
    }
    axios.post('http://event-bus-srv:4040/events', {
        type: 'PostCreated',
        data: posts[id]
    }).catch(err => {
        console.error('Failed to send event to http://event-bus-srv:4040:', err.message)
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
    const { type } = req.body
    res.send({
        message: 'post created'
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('v:latest');
    console.log('post server is up on port', PORT);
})