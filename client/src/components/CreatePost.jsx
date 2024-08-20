/* eslint-disable react/prop-types */

import { useRef, useState } from 'react'
import axios from 'axios'

const CreatePost = ({ fetchPosts }) => {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const postInputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post('http://localhost:4000/posts', {
                title
            })
        } catch (error) {
            console.log(error);
        } finally {
            await fetchPosts()
            setLoading(false)
        }
        setTitle('')
        postInputRef.current.focus()
    }

    return (
        <form onSubmit={handleSubmit} className='grid gap-3'>
            <div className='flex items-center gap-4'>
                <input
                    type="text"
                    value={title}
                    disabled={loading}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Title'
                    id='title_input'
                    className='border w-full border-slate-300 py-2 px-4 '
                    ref={postInputRef}
                />
            </div>
            <button disabled={loading} type="submit"
                className='bg-slate-600 disabled:text-slate-300 p-2 rounded-md text-white font-semibold'>{loading ? "Submiting" : "Submit"}</button>
        </form>
    )
}

export default CreatePost