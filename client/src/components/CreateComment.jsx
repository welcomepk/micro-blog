/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState } from 'react'

const CreateComment = ({ postId, fetchComments }) => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content) return
        try {
            setLoading(true)
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                content
            })
            await fetchComments()
            setContent('')
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <form className='mb-4 grid gap-2' onSubmit={handleSubmit}>
            <input
                type="text"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder='Create Comment'
                className='border rounded-md w-full text-sm border-slate-300 py-1 px-4 '
                disabled={loading}
            />
            <button
                type='submit'
                disabled={loading}
                className='bg-slate-600 disabled:text-slate-300 p-1 rounded-md text-white font-semibold disabled:bg-slate-500'

            >
                {loading ? "Submitting" : "Submit"}
            </button>
        </form>
    )
}

export default CreateComment