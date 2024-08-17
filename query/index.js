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

    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = {
            id,
            title,
            comments: []
        }
    } else if (type === 'CommentCreated') {
        const { id, post_id, content } = data
        const post = posts[post_id]
        if (post) {
            post.comments.push({
                id, content, post_id
            })
        } else {
            console.log("no post with id", post_id);
            return res.status(400).send('error')
        }
    }
    console.log(posts);

    res.send('OK')
})

app.listen(4002, () => {
    console.log('query service up on port', 4002);

})