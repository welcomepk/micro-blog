const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

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
    await new Promise(res => setTimeout(res, 2000))
    res.status(201).send(comments)
})


app.listen(4040, () => {
    console.log('comments server is up on port', 4040);
})