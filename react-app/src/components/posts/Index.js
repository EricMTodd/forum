import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Index = ({
  domain,
  loggedIn
}) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column'
  }

  const postStyles = {
    backgroundColor: 'rgba(50, 50, 50, 1)',
    padding: '25px',
    margin: '15px 0 15px 0',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(100, 100, 100, 1)'
  }

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

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  return(
    <div id='posts-index-container' style={containerStyles}>
      <h1 style={{marginBottom: '0'}}>Forum Posts</h1>
      {loggedIn && <Link to='posts/new' style={{textDecoration: 'none', width: '70px'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>New Post</Link>}
      <div id='posts-container'>
        {posts.map(post => <div key={post.id} id={`post-${post.id}`} style={postStyles}><Link to={`/posts/${post.id}`} style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '24px'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>{post.title}</Link><Link to={`/users/${post.user_id}`} style={{textDecoration: 'none'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>{post.user_handle}</Link></div>)}
      </div>
    </div>
  )
}

export { Index }