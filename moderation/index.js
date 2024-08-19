const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4003

app.post('/events', async (req, res) => {

    const { type, data } = req.body

    if (type === 'CommentCreated') {
        const content = data.content
        const status = content.includes('ass') ? "rejected" : "approved";

        await new Promise(res => setTimeout(res, 10000))

        await fetch('http://localhost:4040/events', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: 'CommentModerated',
                data: {
                    ...data,
                    status
                }
            })
        })
    }
    res.send('OK')

})

app.listen(PORT, () => {
    console.log('moderation is up on port', PORT);
})