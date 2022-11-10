import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { New as NewComment } from '../comments/New'
import { Show as ShowComment } from '../comments/Show'
import { Edit as EditPost } from './Edit'

const Show = ({
  domain,
  loggedIn,
  currentUser
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const topLevelComments = comments.filter(comment => comment.parent_id === null)

  const containerStyles = {
    backgroundColor: 'rgba(50, 50, 50, 1)',
    padding: '50px',
    marginTop: '50px',
    borderRadius: '15px',
    border: '1px solid rgba(100, 100, 100, 1)'
  }

  const buttonStyles = {
    background: 'none',
    color: 'white',
    border: 'none',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontSize: '16px'
  }

  useEffect(() => {
    axios.get(`${domain}/posts/${params.id}`)
    .then(response => {
      if (response.data.successful) {
        setPost(response.data.post)
        setComments(response.data.comments.reverse())
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [params.id])

  const handleDestroy = () => {
    axios.delete(`${domain}/posts/${post.id}/destroy`)
    .then(response => {
      if (response.data.successful) {
        navigate('/')
      }
    })
    .catch(error => console.log(error))
  }

  const toggleEditPostForm = e => {
    if (e.target.nextSibling.style.display !== 'block') {
      e.target.nextSibling.style.display = 'block'
      e.target.previousSibling.style.display = 'none'
      e.target.innerText = 'Hide'
    } else {
      e.target.nextSibling.style.display = 'none'
      e.target.previousSibling.style.display = 'block'
      e.target.innerText = 'Edit'
    }
  }

  const linkHoverEffect = e => {
    if (e.target.style.textDecoration !== 'underline') {
      e.target.style.textDecoration = 'underline'
    } else {
      e.target.style.textDecoration = 'none'
    }
  }

  return(
    <div className='show-post-container' style={containerStyles}>
      <h1 style={{marginTop: '0'}}>{post.title}</h1>
      <Link to={`/users/${post.user_id}`} style={{textDecoration: 'none'}} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>{post.user_handle}</Link>
      <br />
      <p>{post.body}</p>
      { loggedIn && currentUser.id === post.user_id && <button type='button' onClick={toggleEditPostForm} style={buttonStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Edit</button> }
      { loggedIn && currentUser.id === post.user_id && <EditPost domain={domain} post={post} /> }
      { loggedIn && currentUser.id === post.user_id && <button type='button' onClick={handleDestroy} style={buttonStyles} onMouseEnter={linkHoverEffect} onMouseLeave={linkHoverEffect}>Delete</button> }
      { loggedIn && <NewComment domain={domain} currentUser={currentUser} post={post} /> }
      <ul>
        { topLevelComments.map(comment => 
          <li key={comment.id}>
            <ShowComment domain={domain} currentUser={currentUser} loggedIn={loggedIn} post={post} comments={comments} comment={comment} />
          </li>) }
      </ul>
    </div>
  )
}

export { Show }