const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

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
    await new Promise(res => setTimeout(res, 4000))
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body;
    console.log(title);

    posts[id] = {
        id,
        title
    }
    res.status(201).send(posts[id])
})

app.listen(4000, () => {
    console.log('post server is up on port', 4000);
})