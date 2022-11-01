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
    padding: '25px 0 25px 25px',
    margin: '15px 0 15px 0',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '24px'
  }

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

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  const postEnterEffect = e => {
    e.target.style.backgroundColor = 'rgba(100, 100, 100, 1)' 
  }

  const postLeaveEffect = e => {
    e.target.style.backgroundColor = 'rgba(50, 50, 50, 1)'
  }

  const navigateToPost = id => {
    navigate(`/posts/${id}`)
  }

  return(
    <div id='posts-index-container' style={containerStyles}>
      <h1 style={{marginTop: '0'}}>Forum Posts</h1>
      {loggedIn && <Link to='posts/new' style={{textDecoration: 'none'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>New Post</Link>}
      <div id='all-posts'>
        {posts.map(post => <div key={post.id} id={`post-${post.id}`} style={postStyles} onMouseEnter={postEnterEffect} onMouseLeave={postLeaveEffect} onClick={() => navigateToPost(post.id)}>{post.title}</div>)}
      </div>
    </div>
  )
}

export { Index }