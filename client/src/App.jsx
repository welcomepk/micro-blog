/* eslint-disable react/prop-types */
import axios from "axios"
import CreatePost from "./components/CreatePost"
import PostsList from "./components/PostsList"
import { useEffect, useState } from "react"

const Card = ({ children, title }) => {
  return <div className="border my-4 p-6 border-slate-400">
    <h1 className="text-slate-900 text-2xl mb-6">{title}</h1>
    {children}
  </div>
}


function App() {

  const [posts, setPosts] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts')
    setPosts(res.data)
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      await fetchPosts()
      setLoading(false)
    })();

  }, [])

  return <div className="max-w-[1200px] mx-auto p-6">
    <Card title={"Create Post"}>
      <CreatePost fetchPosts={fetchPosts} />
    </Card>

    <Card title={"All Posts"}>
      {
        loading ? 'Loading posts ...' :
          <PostsList fetchPosts={fetchPosts} posts={posts} />
      }
    </Card>
  </div>
}

export default App
