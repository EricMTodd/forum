import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Index = ({
  domain,
  loggedIn
}) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(`${domain}/posts`)
    .then(response => {
      if (response.data.successful) {
        setPosts(response.data.posts.reverse())
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [])

  return(
    <div id='posts-index-container'>
      <h1>Forum Posts</h1>
      {loggedIn && <Link to='posts/new'>New Post</Link>}
      <div id='posts-index-cards-container'>
        {posts.map(post => <div key={post.id} className='posts-index-card' id={`post-${post.id}`}><Link className='post-title-link' to={`/posts/${post.id}`}>{post.title}</Link><Link to={`/users/${post.user_id}`}>{post.user_handle}</Link></div>)}
      </div>
    </div>
  )
}

export { Index }