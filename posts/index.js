const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

let posts = {};

app.delete('/posts/all', async (req, res) => {
    // await new Promise(res => setTimeout(res, 4000))
    posts = {}
    return res.send('posts removed')
})

app.get('/posts', async (req, res) => {
    // await new Promise(res => setTimeout(res, 4000))
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body;

    posts[id] = {
        id,
        title
    }
    try {
        // await axios.post('http://localhost:4040/events', {
        //     type: 'PostCreated',
        //     data: posts[id]
        // })

        const res = await fetch('http://localhost:4040/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: 'PostCreated',
                data: posts[id]
            })
        })
        const data = await res.json()
        console.log(data);

    } catch (error) {
        console.log(error.message || error);
    }
    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
    const { type } = req.body
    console.log('recived', req.body);
    res.send({})
})

app.listen(4000, () => {
    console.log('post server is up on port', 4000);
})