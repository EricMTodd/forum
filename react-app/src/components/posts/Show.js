import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { New as NewComment } from '../comments/New'
import { Show as ShowComment } from '../comments/Show'

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
    borderRadius: '15px'
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
      <p>{post.body}</p>
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