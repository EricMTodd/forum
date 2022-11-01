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
        setPosts(response.data.posts)
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [])

  return(
    <div id='posts-index'>
      <h1 style={{marginTop: '0'}}>Posts Index</h1>
      {loggedIn && <Link to='posts/new'>New Post</Link>}
      <ul>
        {posts.map(post => <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>)}
      </ul>
    </div>
  )
}

export { Index }