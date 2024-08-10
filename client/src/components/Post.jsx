/* eslint-disable react/prop-types */
const Post = ({ post }) => {
    return <li
        className="border border-slate-200 rounded-lg p-4 mb-2"
    >
        <h2>{post.title}</h2>
    </li>
}

export default Post