const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = {
            id,
            title,
            comments: []
        }
    }
    if (type === 'CommentCreated') {
        const { id, post_id, content, status } = data
        const post = posts[post_id]
        post.comments.push({
            id, content, post_id, status
        })
    }
    if (type === 'CommentUpdated') {
        const { id, content, post_id, status } = data
        const post = posts[post_id]
        const comment = post.comments.find(comment => comment.id === id)
        comment.content = content
        comment.status = status
    }
}

app.get('/posts', (req, res) => {
    console.log(posts);

    return res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log("event recived ==> ", req.body);

    handleEvent(type, data)
    res.send('OK')
})

app.listen(4002, async () => {
    console.log('query service up on port', 4002);

    try {
        const res = await fetch('http://localhost:4040/events')
        const data = await res.json()


        for (e of data.events) {
            console.log('processing event', e.type);
            handleEvent(e.type, e.data)
        }
    } catch (error) {
        console.log(error.message || error);
    }
})