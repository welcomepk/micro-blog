import CreateComment from "./CreateComment"
import CommentList from "./CommentList"
import { useEffect, useState } from "react"
import axios from "axios"
/* eslint-disable react/prop-types */
const Post = ({ post }) => {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${post.id}/comments`)
        setComments(res.data)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            await fetchComments()
            setLoading(false)
        })()
    }, [])

    console.log(comments);

    return (
        <li
            className="border border-slate-200 bg-slate-100  rounded-lg p-4 mb-2"
        >
            <h2 className="text-slate-700 text-xl font-semibold">{post.title}</h2>
            <div className="mt-4  p-2">
                <CreateComment fetchComments={fetchComments} postId={post.id} />
                {
                    loading ? "Loading comments ..." :
                        <CommentList comments={comments} />
                }
            </div>
        </li>)
}

export default Post