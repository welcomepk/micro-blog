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

// create a comment
app.post('/posts/:id/comments', async (req, res) => {

    const { content } = req.body
    const post_id = req.params.id
    const id = randomBytes(4).toString('hex')
    const comment = {
        id,
        post_id,
        content,
        status: 'pending' // pending | rejected | approved
    }

    const comments = commentsByPostId[post_id] || []
    comments.push(comment)
    commentsByPostId[post_id] = comments

    try {

        fetch('http://event-bus-srv:4040/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: 'CommentCreated',
                data: comment
            })
        })
    } catch (error) {
        console.log(error.message || error);

    }

    res.status(201).send(comment)
})


app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const comments = commentsByPostId[data.post_id]
        const comment = comments.find(comment => comment.id === data.id)
        comment.status = data.status

        await fetch('http://event-bus-srv:4040/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: 'CommentUpdated',
                data: comment
            })
        })
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('comments server is up on port', 4001);
})