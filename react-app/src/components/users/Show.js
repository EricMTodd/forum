import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Show = ({
  domain,
  loggedIn,
  currentUser
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [user, setUser] = useState({})
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
    alignItems: 'center'
  }

  useEffect(() => {
    axios.get(`${domain}/users/${params.id}`)
    .then(response => {
      if (response.data.successful) {
        setUser(response.data.user)
        setPosts(response.data.posts.reverse())
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [params.id])

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  return(
    <div className='show-user-container' style={containerStyles}>
      <h1>{user.handle}</h1>
      {loggedIn && currentUser.id === user.id && <Link to={`/users/${user.id}/edit`}>Edit</Link>}
      <h2>Posts</h2>
      <div id={`user-${user.id}-posts-container`}>
        {posts.map(post => <div key={post.id} id={`post-${post.id}`} style={postStyles}><Link to={`/posts/${post.id}`} style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '24px'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>{post.title}</Link></div>)}
      </div>
    </div>
  )
}

export { Show }