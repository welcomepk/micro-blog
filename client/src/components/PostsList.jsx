/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import Post from "./Post";

const PostsList = ({ fetchPosts, posts }) => {

    const allPosts = Object.values(posts)

    if (allPosts.length === 0) {
        return <h2 className="text-center text-lg text-red-500">No posts are available.</h2>
    }

    const clearPosts = async () => {
        try {
            await axios.delete('http://localhost:4000/posts/all')
            await fetchPosts()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {/* <button onClick={clearPosts} className="bg-red-300 text-red-950 relative right-0 border border-red-500 px-3 py-1 rounded-md mb-4">Clear</button> */}
            {allPosts.map(post => {
                return <Post key={post.id} post={post} />
            })}
        </ul>
    )
}

export default PostsList