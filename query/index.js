const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

app.get('/posts', (req, res) => {
    return res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log("event recived ==> ", req.body);

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
        if (post) {
            post.comments.push({
                id, content, post_id, status
            })
        } else {
            console.log("no post with id", post_id);
            return res.status(400).send('error')
        }
    }
    if (type === 'CommentUpdated') {
        const { id, content, post_id, status } = data
        const post = posts[post_id]
        const comment = post.comments.find(comment => comment.id === id)
        comment.content = content
        comment.status = status
    }

    console.log(JSON.stringify(posts));

    res.send('OK')
})

app.listen(4002, () => {
    console.log('query service up on port', 4002);

})