const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id
    res.send(commentsByPostId[postId])
})

app.post('/posts/:id/comments', async (req, res) => {

    const { content } = req.body
    const postId = req.params.id
    const id = randomBytes(4).toString('hex')
    const comment = {
        id,
        post_id: postId,
        content
    }

    const comments = commentsByPostId[postId] || []
    comments.push(comment)
    commentsByPostId[postId] = comments
    await fetch('http://localhost:4040/events', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: 'CommentCreated',
            data: comment
        })
    })
    res.status(201).send(comments)
})

app.post('/events', (req, res) => {
    const { type } = req.body
    console.log('recived', req.body);
    res.send({})
})

app.listen(4001, () => {
    console.log('comments server is up on port', 4001);
})